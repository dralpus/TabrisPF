
function preparePage(screenName){
  if (screenName == "welcome"){
    var page = tabris.create("Page", {
        topLevel: true,
      	style: ["FULLSCREEN"]
      });
    
    var slides = [{text:"With PublicFeed, you can share feed with a target audience of your location choice. Catch the moment and define it!",image:"http://test.publicfeed.com/public/images/welcome/step1.jpg"},
                 {text:"To choose your target audience, add tags to your feed",image:"http://test.publicfeed.com/public/images/welcome/step2.jpg"},
                 {text:"Select the specified location for your feed and publish",image:"http://test.publicfeed.com/public/images/welcome/step3.jpg"},
                 {text:"With Nearby feature, you can see and follow the feeds created around you. Let's start !",image:"http://test.publicfeed.com/public/images/welcome/step4.jpg"}
                ];
    
    var bannerPanel = tabris.create("Composite", {
      layoutData: {left: 0, width: screen.width*(slides.length), top: 0, bottom: 150}
    }).appendTo(page);
    
    var buttonPanel = tabris.create("Composite", {
      layoutData: {left: 0, right: 0, top: screen.height-160, bottom: 0}
    }).appendTo(page);
    
    
    tabris.create("Button", {
      layoutData: {left: 20, width: screen.width/2 - 30, height: 40, top: 0},
      textColor:"#FFF",
      background:"#465797",
      text: "Facebook"
    }).on("select", function() {
      
      
      
      var PluginPage = require("./PluginPage");

      var page = new PluginPage("Toast", "nl.x-services.plugins.toast", function(parent) {

        var input = tabris.create("TextInput", {
          text: "your message",
          layoutData: {left: 10, top: 10, right: 10}
        }).appendTo(parent);

        var buttonShortTop = tabris.create("Button", {
          layoutData: {left: 10, top: [input, 10], right: 10},
          text: "Show short top"
        }).appendTo(parent).on("select", function() {
          var text = input.get("text");
          window.plugins.toast.showShortTop(text);
        });

        var buttonShortCenter = tabris.create("Button", {
          layoutData: {left: 10, top: [buttonShortTop, 10], right: 10},
          text: "Show short center"
        }).appendTo(parent).on("select", function() {
          var text = input.get("text");
          window.plugins.toast.showShortCenter(text);
        });

        var buttonShortBottom = tabris.create("Button", {
          layoutData: {left: 10, top: [buttonShortCenter, 10], right: 10},
          text: "Show short bottom"
        }).appendTo(parent).on("select", function() {
          var text = input.get("text");
          window.plugins.toast.showShortBottom(text);
        });

        var buttonLongTop = tabris.create("Button", {
          layoutData: {left: 10, top: [buttonShortBottom, 10], right: 10},
          text: "Show long top"
        }).appendTo(parent).on("select", function() {
          var text = input.get("text");
          window.plugins.toast.showLongTop(text);
        });

        var buttonLongCenter = tabris.create("Button", {
          layoutData: {left: 10, top: [buttonLongTop, 10], right: 10},
          text: "Show long center"
        }).appendTo(parent).on("select", function() {
          var text = input.get("text");
          window.plugins.toast.showLongCenter(text);
        });

        tabris.create("Button", {
          layoutData: {left: 10, top: [buttonLongCenter, 10], right: 10},
          text: "Show long bottom"
        }).appendTo(parent).on("select", function() {
          var text = input.get("text");
          window.plugins.toast.showLongBottom(text);
        });

      });
      page.open();
      
    }).appendTo(buttonPanel);
    
    tabris.create("Button", {
      layoutData: {right: 20, width: screen.width/2 - 30, height: 40, top: 0},
      textColor:"#FFF",
      background:"#D23E2B",
      text: "Google"
    }).on("select", function() {
      preparePage("register").open();
    }).appendTo(buttonPanel);
    
    tabris.create("Button", {
      layoutData: {left: 20, width: screen.width/2 - 30, height: 40, top: 50},
      textColor:"#333",
      text: "Login"
    }).on("select", function() {
      preparePage("login").open();
    }).appendTo(buttonPanel);
    
    tabris.create("Button", {
      layoutData: {right: 20, width: screen.width/2 - 30, height: 40, top: 50},
      textColor:"#333",
      text: "Register"
    }).on("select", function() {
      preparePage("register").open();
    }).appendTo(buttonPanel);
    
    tabris.create("TextView", {
      layoutData: {centerX:0, bottom: 10, height:20},
      text: "or skip for now",
      alignment: "center",
      textColor: "gray"
    }).on("select", function() {
      preparePage("feed").open();
    }).appendTo(buttonPanel);
    
    
    slides.map(function(x,y){
        var image = tabris.create("ImageView", {
        layoutData: {left: screen.width*y, top: 0, width: screen.width, bottom: 0},
        image: {src: x.image},
    //    background: x.color,
        scaleMode: "stretch"
      }).appendTo(bannerPanel);

      tabris.create("TextView", {
        layoutData: {left: screen.width*y+screen.width*0.1, width: screen.width*0.8, bottom: 40},
        text: x.text,
        alignment: "center",
        textColor: "white"
      }).appendTo(bannerPanel);
    });
    
    var logo = tabris.create("ImageView", {
      layoutData: {centerX: 0, top: 40, height:150 },
      image: {src: "http://test.publicfeed.com/public/images/logo_trans.png"},
      scaleMode: "fit"
    }).appendTo(page);
    
    var setBannerPanelPosition = function(x){
      var screenNo = parseInt((currentTranslateX + x - screen.width*0.5) / screen.width);
      screenNo = Math.min(Math.max(-slides.length+1,screenNo),0);
      currentTranslateX = screenNo*screen.width;
      var percentage = Math.abs(screen.width/2 - Math.abs(currentTranslateX + x - screen.width*0.5) % screen.width) / screen.width;
      var animeTime = 250;
       bannerPanel.animate({"transform":{translationX:currentTranslateX}},{duration:animeTime-animeTime*(1-percentage)});
      touchObj = {x:0,y:0};
      touchStarted = false;
    }
    var touchStarted = false;
    var touchObj = {x:0,y:0};
    var currentTranslateX = 0;
    page.on("touchstart", function(widget, event) {
      if (event.touches[0].pageY<screen.height*0.6)
        touchStarted = true;
      else
        return;
      touchObj = {x:event.touches[0].pageX,y:event.touches[0].pageY};
    }).on("touchmove", function(widget, event) {
      if (!touchStarted)
        return;
      var x = event.touches[0].pageX;
      bannerPanel.set("transform",{translationX: currentTranslateX+x-touchObj.x});
    }).on("touchend", function(widget, event) {
      if (!touchStarted)
        return;
      var x = event.touches[0].pageX;
      setBannerPanelPosition(x-touchObj.x);
    }).on("touchcancel", function(widget, event) {
      if (!touchStarted)
        return;
      var x = event.touches[0].pageX;
      setBannerPanelPosition(x-touchObj.x);
    });
    
    
    
    
    return page;
  }
  else if (screenName == "login"){
    var page = tabris.create("Page", {
        topLevel: false,
      	title: "Login"
      });
    return page;
  }
  else if (screenName == "register"){
    var page = tabris.create("Page", {
        topLevel: false,
      	title: "Register"
      });
    return page;
  }
  else if (screenName == "feed"){
    var page = tabris.create("Page", {
        topLevel: true,
      	title: "PublicFeed"
      });
    return page;
  }
  
  
}

var page = preparePage("welcome");

page.open();

// Hit enter to add more lines...



      