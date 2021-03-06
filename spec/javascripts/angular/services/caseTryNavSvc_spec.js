'use strict';
/*global jasmine */

describe('Service: caseTryNavSvc', function () {

  // load the service's module
  beforeEach(module('QuepidTest'));

  var locationMock = null;
  var caseTryNavSvc;

  beforeEach(function() {
    locationMock = {
      path: jasmine.createSpy(),
      search: jasmine.createSpy()
    };

    module(function($provide) {
      $provide.value('$location', locationMock);
    });

    /*jshint camelcase:false*/
    inject(function (_caseTryNavSvc_) {
      caseTryNavSvc = _caseTryNavSvc_;
    });
    /*jshint camelcase:true*/
  });

  it('navigates to new case/try', function () {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/');
  });

  it('navigates to case/try w/ curate', function() {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1, curate: true});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/curate/');
  });

  it('navigates to case/try w/ curate and search', function() {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1, curate: true, curateSearch: 'cat'});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/curate/');
    expect(locationMock.search).toHaveBeenCalledWith({'search': 'cat'});
  });

  it('navigates to case/try w/ curate and new search', function() {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1, curate: true, curateSearch: 'cat'});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/curate/');
    expect(locationMock.search).toHaveBeenCalledWith({'search': 'cat'});
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1, curate: true, curateSearch: 'cat'});
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1, curate: true, curateSearch: 'dog'});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/curate/');
    expect(locationMock.search).toHaveBeenCalledWith({'search': 'dog'});
  });

  it('navigates to new case', function() {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/');
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    caseTryNavSvc.navigateTo({caseNo: 4});
    expect(locationMock.path).toHaveBeenCalledWith('/case/4/try/0/');
  });

  it('navigates to new try', function() {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/');
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    caseTryNavSvc.navigateTo({tryNo: 4});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/4/');
  });

  it('navigates to new case when both specified', function () {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/');
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    caseTryNavSvc.navigateTo({caseNo: 4, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/4/try/1/');
  });

  it('navigates to new try when both specified', function () {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/');
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 2});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/2/');
  });

  it('bootstraps', function() {
    caseTryNavSvc.pathRequested({caseNo: 1, tryNo: 2});
    caseTryNavSvc.bootstrap();
    expect(locationMock.path).toHaveBeenCalledWith('/case/1/try/2/');
  });

  it('doesnt save nav till confirmed', function() {
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path).toHaveBeenCalledWith('/case/5/try/1/');
    expect(caseTryNavSvc.getCaseNo()).toBe(0);
    expect(caseTryNavSvc.getTryNo()).toBe(0);
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    expect(caseTryNavSvc.getCaseNo()).toBe(5);
    expect(caseTryNavSvc.getTryNo()).toBe(1);
  });

  it('calls location with trailing slash', function() {
    // due to an angular bug, we always need to have a trailing / to avoid duplicate route loading
    caseTryNavSvc.navigateTo({caseNo: 5, tryNo: 1});
    expect(locationMock.path.calls.argsFor(0)[0].slice(-1)).toEqual('/');
    expect(caseTryNavSvc.getCaseNo()).toBe(0);
    expect(caseTryNavSvc.getTryNo()).toBe(0);
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    expect(caseTryNavSvc.getCaseNo()).toBe(5);
    expect(caseTryNavSvc.getTryNo()).toBe(1);
  });

  it('allows completion off the bat', function() {
    caseTryNavSvc.navigationCompleted({caseNo: 5, tryNo: 1});
    expect(caseTryNavSvc.getCaseNo()).toBe(5);
    expect(caseTryNavSvc.getTryNo()).toBe(1);
  });


  it('bookmark', function() {
    console.log('bookmark');
  });
});
