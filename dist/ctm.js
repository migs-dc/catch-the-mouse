/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("document.addEventListener('DOMContentLoaded', function () {\n  var context = document.getElementById(\"canvas\").getContext(\"2d\");\n  var width = 750;\n  var height = 500;\n  var catHeight = 40;\n  var catWidth = 60;\n  var mouseHeight = 15;\n  var mouseWidth = 25;\n  var tableHeight = 150;\n  var tableWidth = 300;\n  var shelfHeight = 300;\n  var shelfWidth = 200;\n  var floorHeight = 10;\n  var minY = floorHeight;\n  context.canvas.width = width;\n  context.canvas.height = height;\n  var shelf = {\n    height: shelfHeight,\n    width: shelfWidth,\n    x: 300,\n    y: height - floorHeight - shelfHeight\n  };\n  var table = {\n    height: tableHeight,\n    width: tableWidth,\n    x: 400,\n    y: height - floorHeight - tableHeight\n  };\n  var cat = {\n    height: catHeight,\n    width: catWidth,\n    x: 150,\n    y: height - floorHeight - catHeight,\n    xVelocity: 0,\n    yVelocity: 0,\n    jumping: false,\n    onPlatform: false\n  };\n  var catMove = {\n    left: false,\n    right: false,\n    jump: false,\n    drop: false\n  };\n  var mouse = {\n    height: mouseHeight,\n    width: mouseWidth,\n    x: 550,\n    y: height - floorHeight - mouseHeight,\n    xVelocity: 0,\n    yVelocity: 0\n  };\n\n  function offScreen(animal) {\n    if (animal.x < -animal.width) {\n      animal.x = width;\n    } else if (animal.x > width) {\n      animal.x = -animal.width;\n    }\n  }\n\n  function keyListener(e) {\n    var moving;\n    e.type === \"keydown\" ? moving = true : moving = false;\n\n    switch (e.keyCode) {\n      case 37:\n        catMove.left = moving;\n        break;\n\n      case 65:\n        catMove.left = moving;\n        break;\n\n      case 39:\n        catMove.right = moving;\n        break;\n\n      case 68:\n        catMove.right = moving;\n        break;\n\n      case 38:\n        catMove.jump = moving;\n        break;\n\n      case 87:\n        catMove.jump = moving;\n        break;\n\n      case 40:\n        catMove.drop = moving;\n        break;\n\n      case 83:\n        catMove.drop = moving;\n        break;\n    }\n  }\n\n  function game() {\n    if (catMove.jump && !cat.jumping) {\n      cat.yVelocity -= Math.abs(cat.xVelocity);\n      cat.yVelocity -= 22;\n      cat.jumping = true;\n    }\n\n    if (catMove.left) {\n      cat.xVelocity -= 2;\n    } else if (catMove.right) {\n      cat.xVelocity += 2;\n    }\n\n    cat.x += cat.xVelocity;\n    cat.xVelocity *= 0.75; // friction\n\n    cat.yVelocity += 2;\n    cat.y += cat.yVelocity; // // can't go passed the left and right borders\n    // if (cat.x <= 0){\n    //   catMove.left = false;\n    //   cat.xVelocity = 0;\n    // } else if (cat.x >= width - cat.width){\n    //   catMove.right = false;\n    //   cat.xVelocity = 0;\n    // }\n    // pass through sides\n\n    offScreen(cat);\n\n    if (catMove.drop) {\n      minY = floorHeight;\n    } // can't pass through the floor/platform when jumping\n\n\n    if (cat.y >= height - minY - catHeight) {\n      cat.yVelocity = 0;\n      cat.jumping = false;\n      cat.y = height - minY - cat.height;\n    }\n\n    if (cat.y <= table.y - cat.height) {\n      // land on table\n      if (cat.x + cat.width > table.x && cat.x < table.x + table.width) {\n        minY = table.height + floorHeight;\n      } else {\n        minY = floorHeight;\n      }\n    }\n\n    if (cat.y <= shelf.y - cat.height) {\n      // land on shelf\n      if (cat.x + cat.width > shelf.x && cat.x < shelf.x + shelf.width) {\n        minY = shelf.height + floorHeight;\n      } else {\n        minY = floorHeight;\n      }\n    }\n\n    mouse.xVelocity *= 0.75;\n    mouse.xVelocity += 2.5;\n    mouse.x += mouse.xVelocity;\n    offScreen(mouse); //catch the mouse\n\n    context.fillStyle = \"#87cefa\"; // canvas\n\n    context.fillRect(0, 0, width, height); // x, y, width, height\n\n    context.fillStyle = \"#1B0000\"; // shelf\n\n    context.fillRect(shelf.x, shelf.y, shelf.width, shelf.height);\n    context.fillStyle = \"#331800\"; // table\n\n    context.fillRect(table.x, table.y, table.width, table.height);\n    context.fillStyle = \"#A16AE8\"; // mouse\n\n    context.fillRect(mouse.x, mouse.y, mouse.width, mouse.height);\n    context.fillStyle = \"#BB814C\"; // cat\n\n    context.fillRect(cat.x, cat.y, cat.width, cat.height);\n    context.fillStyle = \"#654321\"; // floor\n\n    context.fillRect(0, height - floorHeight, width, floorHeight);\n    window.requestAnimationFrame(game);\n  }\n\n  window.addEventListener(\"keydown\", keyListener);\n  window.addEventListener(\"keyup\", keyListener);\n  window.requestAnimationFrame(game);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXRjaC10aGUtbW91c2UvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250ZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJjYXRIZWlnaHQiLCJjYXRXaWR0aCIsIm1vdXNlSGVpZ2h0IiwibW91c2VXaWR0aCIsInRhYmxlSGVpZ2h0IiwidGFibGVXaWR0aCIsInNoZWxmSGVpZ2h0Iiwic2hlbGZXaWR0aCIsImZsb29ySGVpZ2h0IiwibWluWSIsImNhbnZhcyIsInNoZWxmIiwieCIsInkiLCJ0YWJsZSIsImNhdCIsInhWZWxvY2l0eSIsInlWZWxvY2l0eSIsImp1bXBpbmciLCJvblBsYXRmb3JtIiwiY2F0TW92ZSIsImxlZnQiLCJyaWdodCIsImp1bXAiLCJkcm9wIiwibW91c2UiLCJvZmZTY3JlZW4iLCJhbmltYWwiLCJrZXlMaXN0ZW5lciIsImUiLCJtb3ZpbmciLCJ0eXBlIiwia2V5Q29kZSIsImdhbWUiLCJNYXRoIiwiYWJzIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELE1BQUlDLE9BQU8sR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxVQUFsQyxDQUE2QyxJQUE3QyxDQUFkO0FBRUEsTUFBTUMsS0FBSyxHQUFHLEdBQWQ7QUFDQSxNQUFNQyxNQUFNLEdBQUcsR0FBZjtBQUNBLE1BQU1DLFNBQVMsR0FBRyxFQUFsQjtBQUNBLE1BQU1DLFFBQVEsR0FBRyxFQUFqQjtBQUNBLE1BQU1DLFdBQVcsR0FBRyxFQUFwQjtBQUNBLE1BQU1DLFVBQVUsR0FBRyxFQUFuQjtBQUVBLE1BQU1DLFdBQVcsR0FBRyxHQUFwQjtBQUNB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QUFPLENBQUN5QyxTQUFSLEdBQW9CLFNBQXBCLENBM0VjLENBMkVpQjs7QUFDL0J6QyxJQUFBQSxPQUFPLENBQUMwQyxRQUFSLENBQWlCWixLQUFLLENBQUNiLENBQXZCLEVBQTBCYSxLQUFLLENBQUNaLENBQWhDLEVBQW1DWSxLQUFLLENBQUMzQixLQUF6QyxFQUFnRDJCLEtBQUssQ0FBQzFCLE1BQXREO0FBRUFKLElBQUFBLE9BQU8sQ0FBQ3lDLFNBQVIsR0FBb0IsU0FBcEIsQ0E5RWMsQ0E4RWlCOztBQUMvQnpDLElBQUFBLE9BQU8sQ0FBQzBDLFFBQVIsQ0FBaUJ0QixHQUFHLENBQUNILENBQXJCLEVBQXdCRyxHQUFHLENBQUNGLENBQTVCLEVBQStCRSxHQUFHLENBQUNqQixLQUFuQyxFQUEwQ2lCLEdBQUcsQ0FBQ2hCLE1BQTlDO0FBRUFKLElBQUFBLE9BQU8sQ0FBQ3lDLFNBQVIsR0FBb0IsU0FBcEIsQ0FqRmMsQ0FpRmlCOztBQUMvQnpDLElBQUFBLE9BQU8sQ0FBQzBDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0J0QyxNQUFNLEdBQUNTLFdBQTNCLEVBQXdDVixLQUF4QyxFQUErQ1UsV0FBL0M7QUFFQThCLElBQUFBLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkJOLElBQTdCO0FBQ0Q7O0FBRURLLEVBQUFBLE1BQU0sQ0FBQzVDLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1Da0MsV0FBbkM7QUFDQVUsRUFBQUEsTUFBTSxDQUFDNUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNrQyxXQUFqQztBQUNBVSxFQUFBQSxNQUFNLENBQUNDLHFCQUFQLENBQTZCTixJQUE3QjtBQUNELENBbk1EIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBsZXQgY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBcclxuICBjb25zdCB3aWR0aCA9IDc1MDtcclxuICBjb25zdCBoZWlnaHQgPSA1MDA7XHJcbiAgY29uc3QgY2F0SGVpZ2h0ID0gNDA7XHJcbiAgY29uc3QgY2F0V2lkdGggPSA2MDtcclxuICBjb25zdCBtb3VzZUhlaWdodCA9IDE1O1xyXG4gIGNvbnN0IG1vdXNlV2lkdGggPSAyNTtcclxuICBcclxuICBjb25zdCB0YWJsZUhlaWdodCA9IDE1MDtcclxuICBjb25zdCB0YWJsZVdpZHRoID0gMzAwO1xyXG4gIGNvbnN0IHNoZWxmSGVpZ2h0ID0gMzAwO1xyXG4gIGNvbnN0IHNoZWxmV2lkdGggPSAyMDA7XHJcbiAgXHJcbiAgY29uc3QgZmxvb3JIZWlnaHQgPSAxMDtcclxuICBsZXQgbWluWSA9IGZsb29ySGVpZ2h0O1xyXG4gIFxyXG4gIGNvbnRleHQuY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIFxyXG4gIGxldCBzaGVsZiA9IHtcclxuICAgIGhlaWdodDogc2hlbGZIZWlnaHQsXHJcbiAgICB3aWR0aDogc2hlbGZXaWR0aCxcclxuICAgIHg6IDMwMCxcclxuICAgIHk6IGhlaWdodCAtIGZsb29ySGVpZ2h0IC0gc2hlbGZIZWlnaHRcclxuICB9XHJcbiAgXHJcbiAgbGV0IHRhYmxlID0ge1xyXG4gICAgaGVpZ2h0OiB0YWJsZUhlaWdodCxcclxuICAgIHdpZHRoOiB0YWJsZVdpZHRoLFxyXG4gICAgeDogNDAwLFxyXG4gICAgeTogaGVpZ2h0IC0gZmxvb3JIZWlnaHQgLSB0YWJsZUhlaWdodFxyXG4gIH1cclxuICBcclxuICBsZXQgY2F0ID0ge1xyXG4gICAgaGVpZ2h0OiBjYXRIZWlnaHQsXHJcbiAgICB3aWR0aDogY2F0V2lkdGgsXHJcbiAgICB4OiAxNTAsXHJcbiAgICB5OiBoZWlnaHQgLSBmbG9vckhlaWdodCAtIGNhdEhlaWdodCxcclxuICAgIHhWZWxvY2l0eTogMCxcclxuICAgIHlWZWxvY2l0eTogMCxcclxuICAgIGp1bXBpbmc6IGZhbHNlLFxyXG4gICAgb25QbGF0Zm9ybTogZmFsc2VcclxuICB9XHJcbiAgXHJcbiAgbGV0IGNhdE1vdmUgPSB7XHJcbiAgICBsZWZ0OiBmYWxzZSxcclxuICAgIHJpZ2h0OiBmYWxzZSxcclxuICAgIGp1bXA6IGZhbHNlLFxyXG4gICAgZHJvcDogZmFsc2VcclxuICB9XHJcblxyXG4gIGxldCBtb3VzZSA9IHtcclxuICAgIGhlaWdodDogbW91c2VIZWlnaHQsXHJcbiAgICB3aWR0aDogbW91c2VXaWR0aCxcclxuICAgIHg6IDU1MCxcclxuICAgIHk6IGhlaWdodCAtIGZsb29ySGVpZ2h0IC0gbW91c2VIZWlnaHQsXHJcbiAgICB4VmVsb2NpdHk6IDAsXHJcbiAgICB5VmVsb2NpdHk6IDBcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9mZlNjcmVlbihhbmltYWwpIHsgICAgXHJcbiAgICBpZiAoYW5pbWFsLnggPCAtYW5pbWFsLndpZHRoKSB7XHJcbiAgICAgIGFuaW1hbC54ID0gd2lkdGg7XHJcbiAgICB9IGVsc2UgaWYgKGFuaW1hbC54ID4gd2lkdGgpIHtcclxuICAgICAgYW5pbWFsLnggPSAtYW5pbWFsLndpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24ga2V5TGlzdGVuZXIoZSkge1xyXG4gICAgbGV0IG1vdmluZztcclxuICAgIChlLnR5cGUgPT09IFwia2V5ZG93blwiKSA/IG1vdmluZyA9IHRydWUgOiBtb3ZpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBzd2l0Y2goZS5rZXlDb2RlKXtcclxuICAgICAgY2FzZSAzNzogXHJcbiAgICAgICAgY2F0TW92ZS5sZWZ0ID0gbW92aW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDY1OiBcclxuICAgICAgICBjYXRNb3ZlLmxlZnQgPSBtb3Zpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIFxyXG4gICAgICBjYXNlIDM5OlxyXG4gICAgICAgIGNhdE1vdmUucmlnaHQgPSBtb3Zpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNjg6XHJcbiAgICAgICAgY2F0TW92ZS5yaWdodCA9IG1vdmluZztcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgY2F0TW92ZS5qdW1wID0gbW92aW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDg3OlxyXG4gICAgICAgIGNhdE1vdmUuanVtcCA9IG1vdmluZztcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgY2F0TW92ZS5kcm9wID0gbW92aW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDgzOlxyXG4gICAgICAgIGNhdE1vdmUuZHJvcCA9IG1vdmluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdhbWUoKSB7XHJcbiAgICBpZiAoY2F0TW92ZS5qdW1wICYmICFjYXQuanVtcGluZykge1xyXG4gICAgICBjYXQueVZlbG9jaXR5IC09IE1hdGguYWJzKGNhdC54VmVsb2NpdHkpO1xyXG4gICAgICBjYXQueVZlbG9jaXR5IC09IDIyO1xyXG4gICAgICBjYXQuanVtcGluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhdE1vdmUubGVmdCkge1xyXG4gICAgICBjYXQueFZlbG9jaXR5IC09IDI7XHJcbiAgICB9IGVsc2UgaWYgKGNhdE1vdmUucmlnaHQpIHtcclxuICAgICAgY2F0LnhWZWxvY2l0eSArPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIGNhdC54ICs9IGNhdC54VmVsb2NpdHk7XHJcbiAgICBjYXQueFZlbG9jaXR5ICo9IDAuNzU7IC8vIGZyaWN0aW9uXHJcblxyXG4gICAgY2F0LnlWZWxvY2l0eSArPSAyOyBcclxuICAgIGNhdC55ICs9IGNhdC55VmVsb2NpdHk7XHJcblxyXG4gICAgLy8gLy8gY2FuJ3QgZ28gcGFzc2VkIHRoZSBsZWZ0IGFuZCByaWdodCBib3JkZXJzXHJcbiAgICAvLyBpZiAoY2F0LnggPD0gMCl7XHJcbiAgICAvLyAgIGNhdE1vdmUubGVmdCA9IGZhbHNlO1xyXG4gICAgLy8gICBjYXQueFZlbG9jaXR5ID0gMDtcclxuICAgIC8vIH0gZWxzZSBpZiAoY2F0LnggPj0gd2lkdGggLSBjYXQud2lkdGgpe1xyXG4gICAgLy8gICBjYXRNb3ZlLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAvLyAgIGNhdC54VmVsb2NpdHkgPSAwO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHBhc3MgdGhyb3VnaCBzaWRlc1xyXG4gICAgb2ZmU2NyZWVuKGNhdCk7XHJcblxyXG4gICAgaWYoY2F0TW92ZS5kcm9wKXtcclxuICAgICAgbWluWSA9IGZsb29ySGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbid0IHBhc3MgdGhyb3VnaCB0aGUgZmxvb3IvcGxhdGZvcm0gd2hlbiBqdW1waW5nXHJcbiAgICBpZiAoY2F0LnkgPj0gaGVpZ2h0IC0gbWluWSAtIGNhdEhlaWdodCl7XHJcbiAgICAgIGNhdC55VmVsb2NpdHkgPSAwO1xyXG4gICAgICBjYXQuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICBjYXQueSA9IGhlaWdodCAtIG1pblkgLSBjYXQuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGNhdC55IDw9IHRhYmxlLnkgLSBjYXQuaGVpZ2h0KXsgLy8gbGFuZCBvbiB0YWJsZVxyXG4gICAgICBpZiAoY2F0LnggKyBjYXQud2lkdGggPiB0YWJsZS54ICYmIGNhdC54IDwgdGFibGUueCArIHRhYmxlLndpZHRoKXsgXHJcbiAgICAgICAgbWluWSA9IHRhYmxlLmhlaWdodCArIGZsb29ySGVpZ2h0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pblkgPSBmbG9vckhlaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKGNhdC55IDw9IHNoZWxmLnkgLSBjYXQuaGVpZ2h0KXsgLy8gbGFuZCBvbiBzaGVsZlxyXG4gICAgICBpZiAoY2F0LnggKyBjYXQud2lkdGggPiBzaGVsZi54ICYmIGNhdC54IDwgc2hlbGYueCArIHNoZWxmLndpZHRoKXsgICAgXHJcbiAgICAgICAgbWluWSA9IHNoZWxmLmhlaWdodCArIGZsb29ySGVpZ2h0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1pblkgPSBmbG9vckhlaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlLnhWZWxvY2l0eSAqPSAwLjc1O1xyXG4gICAgbW91c2UueFZlbG9jaXR5ICs9IDIuNTtcclxuICAgIG1vdXNlLnggKz0gbW91c2UueFZlbG9jaXR5O1xyXG5cclxuICAgIG9mZlNjcmVlbihtb3VzZSk7XHJcblxyXG4gICAgLy9jYXRjaCB0aGUgbW91c2VcclxuICAgIFxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiM4N2NlZmFcIjsgLy8gY2FudmFzXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpOy8vIHgsIHksIHdpZHRoLCBoZWlnaHRcclxuXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzFCMDAwMFwiOyAvLyBzaGVsZlxyXG4gICAgY29udGV4dC5maWxsUmVjdChzaGVsZi54LCBzaGVsZi55LCBzaGVsZi53aWR0aCwgc2hlbGYuaGVpZ2h0KTtcclxuICAgIFxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMzMzE4MDBcIjsgLy8gdGFibGVcclxuICAgIGNvbnRleHQuZmlsbFJlY3QodGFibGUueCwgdGFibGUueSwgdGFibGUud2lkdGgsIHRhYmxlLmhlaWdodCk7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNBMTZBRThcIjsgLy8gbW91c2VcclxuICAgIGNvbnRleHQuZmlsbFJlY3QobW91c2UueCwgbW91c2UueSwgbW91c2Uud2lkdGgsIG1vdXNlLmhlaWdodCk7XHJcbiAgICBcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjQkI4MTRDXCI7IC8vIGNhdFxyXG4gICAgY29udGV4dC5maWxsUmVjdChjYXQueCwgY2F0LnksIGNhdC53aWR0aCwgY2F0LmhlaWdodCk7XHJcbiAgICBcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjNjU0MzIxXCI7IC8vIGZsb29yXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIGhlaWdodC1mbG9vckhlaWdodCwgd2lkdGgsIGZsb29ySGVpZ2h0KTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWUpO1xyXG4gIH1cclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleUxpc3RlbmVyKTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleUxpc3RlbmVyKTtcclxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWUpO1xyXG59KSJdLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXRjaC10aGUtbW91c2UvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSIsImZpbGUiOiIuL3NyYy9pbmRleC5zY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;