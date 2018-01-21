angular.module('app.directives', [])

  .directive('blankDirective', [function () {

  }])

  .directive('dynamicUrl', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attr) {
        element.attr('src', attr.dynamicUrlSrc);
      }
    };
  })

  // .filter('split', function() {
  //        return function(input) {
  //            // do some bounds checking here to ensure it has that index
  //
  //            var splitResult = input.split(';;');
  //            for(var i=0, i<splitResult.length;i++){
  //                return splitResult;
  //            }
  //        }
  //    })

  .filter('customSplitString', function () {
    return function (input) {
      console.log(input)
      var arr = input.split(';;');
      console.log(arr)
      for (var i = 0; i < arr.length; i++) {
        var splitingred = document.getElementById("nlabel").innerHtml = arr[i] + "<br>";
        console.log(splitingred);
      }
      return splitingred;

    };
  });
