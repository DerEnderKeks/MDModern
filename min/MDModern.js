/*! MDModern by Philipp Miller */
!function(a,b){"use strict";function c(){return t?!1:(t=!0,g("locked"),!0)}function d(){return t?(t=!1,g("unlocked"),!0):!1}function e(a){alert("USER###"+a)}function f(a){s=!1,alert("LOGIN###"+a)}function g(a,b){l.triggerHandler(a,b)}function h(a,b,c,d){this.name=a,this.gecos=b,this.loggedIn=c||!1,this.facefile=d||"file:///home/"+a+"/.face"}function i(a,b){this.name=a,this.file=b}function j(a,b){this.name=a,this.code=b}var k=a.mdm={},l=b(k),m=null,n=null,o=null,p=[],q=[],r=[],s=!1,t=!0;k.on=b.fn.on.bind(l),k.one=b.fn.one.bind(l),k.on("passwordPrompt",function(){s=!0}).one("prompt",d),k.login=function(a,b){return c()&&(k.one("passwordPrompt",function(){k.one("prompt",d),f(b)}),e(a)),this},k.selectUser=function(a){return a=""+a,a!==m&&c()&&(k.one("prompt",d),e(a)),this},k.sendPassword=function(a){return c()&&(s?(k.one("prompt",d),f(a)):m&&(k.one("passwordPrompt",function(){k.one("prompt",d),f(a)}),e(m))),this},k.getUser=function(a){for(var b=0,c=p.length;c>b;++b)if(p[b].name===""+a)return p[b]},k.getSession=function(a){for(var b=0,c=q.length;c>b;++b)if(q[b].file===""+a)return q[b]},k.selectSession=function(a){return alert("SESSION###"+a.name+"###"+a.file),k},k.getLanguage=function(a){for(var b=0,c=r.length;c>b;++b)if(r[b].code===""+a)return r[b]},k.selectLanguage=function(a){return alert("LANGUAGE###"+a.code),k},k.shutdown=function(){return alert("FORCE-SHUTDOWN###"),k},k.restart=function(){return alert("FORCE-RESTART###"),k},k.suspend=function(){return alert("FORCE-SUSPEND###"),k},k.quit=function(){return alert("QUIT###"),k},h.prototype={toString:function(){return this.name},select:function(){return k.selectUser(this),this}},i.prototype={select:function(){return k.selectSession(this),this}},j.prototype={select:function(){return k.selectLanguage(this),this},countryCode:function(){return this.code.split(".")[0]},shortCode:function(){return this.code.split("_")[0]},charset:function(){return this.code.split(".")[1]}},a.mdm_enable=function(){g("enabled")},a.mdm_disable=function(){g("disabled")},a.mdm_prompt=function(){g("usernamePrompt"),g("prompt")},a.mdm_noecho=function(){g("passwordPrompt"),g("prompt")},a.mdm_add_user=function(a,b,c,d){var e=new h(a,b,c,d);p.push(e),g("userAdded",e)},a.mdm_add_session=function(a,b){var c=new i(a,b);q.push(c),g("sessionAdded",c)},a.mdm_add_language=function(a,b){var c=new j(a,b);r.push(c),g("languageAdded",c)},a.mdm_set_current_user=function(a){a&&m!==a&&(m=a,g("userSelected",k.getUser(a)||new h(a)))},a.mdm_set_current_session=function(a,b){n!==b&&(n=b,g("sessionSelected",k.getSession(b)))},a.mdm_set_current_language=function(a,b){o!==b&&(o=b,g("languageSelected",k.getLanguage(b)))},a.mdm_error=function(a){a&&g("error",a)},a.mdm_msg=function(a){a&&g("message",a)},a.mdm_timed=function(a){g("timedMessage",a),g("loginCountdown",+a.match(/[0-9]+/)[0])},a.set_welcome_message=function(a){a&&g("welcomeMessage",a)},a.set_clock=function(a){g("clockUpdate",a)},a.mdm_hide_shutdown=function(){g("shutdownHidden")},a.mdm_hide_restart=function(){g("restartHidden")},a.mdm_hide_suspend=function(){g("suspendHidden")},a.mdm_hide_quit=function(){g("quitHidden")},a.mdm_hide_xdmcp=function(){g("xdmcpHidden")}}(window,jQuery),function(a,b,c){"use strict";function d(a,d,e){if(a in l)return l[a];if("boolean"==typeof d&&(e=d,d=c),e=b&&(e===c||e),e&&b.hasOwnProperty(a))return l[a]=Promise.resolve(JSON.parse(b.getItem(a)));var g=!1,h=function(){return function(a){throw g||(g=!0),a}};return l[a]=new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="text",d.addEventListener("load",function(){d.status<400?b(d.responseText):c(Error(d.statusText))}),d.send()}).catch(h("loading")).then(f(d)).catch(h("parsing")).then(function(c){return e&&b.setItem(a,JSON.stringify(c)),c}).catch(h("storing"))}function e(a){return b&&(a?delete b.filename:b.clear()),k}function f(a){if("function"==typeof a)return a;switch(a){case c:case null:case"properties":return h;case"plain":return j;case"lines":return g;case"json":return JSON.parse}throw Error('Config: Unknown parser "'+a+"'")}function g(a){return a.split("\n").map(i).filter(j)}function h(a){var b,c,d={};return a.split("\n").map(i).forEach(function(a,e){if(""!==a)if(c=m.exec(a))d[c[1]]=JSON?JSON.parse(c[2]):c[2];else if(c=n.exec(a))b=c[1],d.hasOwnProperty(b)||(d[b]=[]);else{if(!b)throw Error("Config: Syntax error on line "+(e+1)+" '"+a+"'");d[b].push(a)}}),d}function i(a){return o.exec(a)[0]}function j(a){return a}var k=a.config={require:d,clear:e},l=Object.create(null),m=/^(\S+)\s*=\s*(.*)$/,n=/^\[(\S+)\]$/,o=/^[^#"]*(:?"[^"]*"[^#"]*)*/}(window,localStorage),function(a,b){"use strict";["shutdown","restart","suspend","quit"].forEach(function(c){var d=b("#"+c);d.length&&(a.on(c+"Hidden",function(){d.hide()}),d.find("a").click(a[c]))})}(mdm,jQuery),function(a,b){"use strict";function c(a,c){if(c){var e=b('<li class="message">'+c+"</li>");d.append(e.fadeIn()).animate({scrollTop:d.height()},500)}}var d=b("#messages");a.on("error",c)}(mdm,jQuery),function(a,b){"use strict";function c(a,b){e.text(b)}function d(a,b){b>g&&(g=b,f.addClass("running")),f.css({width:100*b/g+"%"})}var e=b("#countdown"),f=b("#countdown-bar"),g=-1;e.length&&a.on("loginCountdown",c),f.length&&a.on("loginCountdown",d)}(mdm,jQuery),function(a,b){"use strict";function c(b){b.preventDefault(),a.login(k[0].value,l[0].value),l.select()}function d(a,c){var d=b("<li>"),f=b("<a>"+c.name+"</a>"),i=b('<i class="fa fa-user">'),j=new Image;p.append(d.append(f.prepend(i))),c.loggedIn&&d.addClass("loggedIn"),f.click(function(a){e(a,c)}),j.loaded=!1,j.src=c.facefile,b(j).one("load",function(){i.remove(),f.prepend(j),j.loaded=!0}),c.$li=d,c.img=j,n.push(c),1===n.length&&o.one("click",g),h||(h=c)}function e(a,b){h.$li.removeClass("selected"),f(b),b&&b.$li&&(k.is(a.target)||b.name===k[0].value||k.val(b.name),b.$li&&b.$li.addClass("selected"),h=b)}function f(a){j.removeClass("hasface"),a&&a.img&&(a.img.loaded?(m.src=a.img.src,j.addClass("hasface")):b(a.img).one("load",function(){a==h&&(m.src=a.img.src),j.addClass("hasface")}))}function g(a){q?(i.off("click",g),o.one("click",g)):(i.click(g),a.stopPropagation()),p.toggleClass("expanded"),q=!q}var h,i=b(document.body),j=b("#login"),k=b("#username",j),l=b("#password",j),m=b("#face",j)[0],n=[],o=b("#userlist-toggle",j),p=b("#users",j),q=!1;a.on("userAdded",d).on("userSelected",e).one("passwordPrompt",function(){l.select()}),k.on("propertychange input paste",function(b){e(b,a.getUser(this.value))}),j.submit(c)}(mdm,jQuery),function(a){"use strict";function b(b,c){c.li=a(document.createElement("li")).append(a("<a>"+c.name+"</a>").click(c.select.bind(c))),f.append(c.li),d||(d=c)}function c(a,b){d.li.removeClass("selected"),e.html(b.name),b.li.addClass("selected"),d=b}var d,e=a("#session"),f=a("#sessions");mdm.on("sessionAdded",b).on("sessionSelected",c)}(jQuery),function(a){"use strict";function b(b,c){c.li=a(document.createElement("li")).append(a('<a><span class="code">'+c.countryCode()+'</span><span class="name">'+c.name+"</span></a>").click(c.select.bind(c))),f.append(c.li),d||(d=c)}function c(a,b){d.li.removeClass("selected"),e.html(b.shortCode()),b.li.addClass("selected"),d=b}var d,e=a("#language"),f=a("#languages");mdm.on("languageAdded",b).on("languageSelected",c)}(jQuery),function(a,b,c){"use strict";function d(a){var d=c.getElementsByClassName("slideshow"),f=d.length?d[0]:c.body;b.slideshow=a.grid&&"1x1"!==a.grid&&/^\d+x\d+$/.test(a.grid)?new g(f,a):new e(f,a)}function e(a,b){this.parent=a,this.parent.insertAdjacentHTML("afterbegin",h);var c=this.parent.getElementsByClassName("slideshow-layer"),d=this.parent.getElementsByClassName("slideshow-filename");this.layers=[];for(var e=0,g=c.length;g>e;++e)this.layers[e]=new f(this,c[e],d[e]);this.currentLayer=0,this.loader=new Image,this.loader.addEventListener("load",this._showCurrent.bind(this)),this.ctrlsElem=this.parent.getElementsByClassName("slideshow-controls")[0],b&&this.init(b),this._btn("next"),this._btn("prev"),this._btn("toggle")}function f(a,b,c){this.ss=a,this.elem=b,this.elemStyle=b.style,this.filenameElem=c}function g(b,d){var f,g=d.grid.split("x"),h=g[0],j=g[1];this.slideshows=[];for(var k=0;h>k;++k)for(var l=0;j>l;++l)f=c.createElement("div"),f.style.position="absolute",f.style.left=l/j*100+"%",f.style.top=k/h*100+"%",f.style.width=1/j*100+"%",f.style.height=1/h*100+"%",b.appendChild(f),this.slideshows.push(new e(f,a.extend(d,{interval_seconds:Math.round(1e3*(2.5+Math.random()*(2*(d.interval_seconds||i.interval_seconds)-5)))/1e3})))}var h='<div class="slideshow-layer"><span class="slideshow-filename"></span></div><div class="slideshow-layer"><span class="slideshow-filename"></span></div><span class="slideshow-controls"><a class="slideshow-prev"><i class="fa fa-chevron-left"></i></a><a class="slideshow-toggle"><i class="fa fa-play"></i></a><a class="slideshow-next"><i class="fa fa-chevron-right"></i></a></span>',i={interval_seconds:10,fade_seconds:2,shuffle:!0,show_controls:!0,show_filename:!1,grid:null,fill_style:null,background_style:"#222"};e.prototype={init:function(b){return this.cfg=b=a.extend(i,b),this.sources=b.backgrounds.slice(0),this.currentId=0,this.intervalId&&this.stop(),1===this.sources.length?(this.setImage(this.sources[0]),void(this.ctrlsElem.style.display="none")):(b.shuffle&&this.shuffle(),this.setImage(this.sources[0]).start(),this.ctrlsElem.style.display=b.show_controls?null:"none",this)},_btn:function(a){var b=this.ctrlsElem.getElementsByClassName("slideshow-"+a);return b.length?(b[0].addEventListener("click",this[a].bind(this)),b[0]):void 0},setImage:function(a){return this.loader.src=a,this},_showCurrent:function(){return this.layers[this.currentLayer].hide(),this.currentLayer=(this.currentLayer+1)%this.layers.length,this.layers[this.currentLayer].show(this.loader),this},next:function(a){return a&&(a.defaultPrevented||a.preventDefault())||(this.currentId=(this.currentId+1)%this.sources.length,this.setImage(this.sources[this.currentId])),this},prev:function(a){return a&&(a.defaultPrevented||a.preventDefault())||(this.currentId=(this.currentId+this.sources.length-1)%this.sources.length,this.setImage(this.sources[this.currentId])),this},start:function(a){return a&&(a.defaultPrevented||a.preventDefault())||this.intervalId||(this.intervalId=b.setInterval(this.next.bind(this),1e3*this.cfg.interval_seconds),this.ctrlsElem.classList.add("slideshow-running")),this},stop:function(a){return a&&(a.defaultPrevented||a.preventDefault())||this.intervalId&&(b.clearInterval(this.intervalId),this.intervalId=!1,this.ctrlsElem.classList.remove("slideshow-running")),this},toggle:function(a){return this.intervalId?this.stop(a):this.start(a)},shuffle:function(){for(var a,b,c=this.sources,d=c.length;d--;)b=Math.floor(Math.random()*d),a=c[d],c[d]=c[b],c[b]=a;return this},openCurrent:function(){b.open(this.sources[this.currentId])}},f.prototype={show:function(a){var b=this.ss.cfg.fill_style?this.ss.cfg.fill_style:"50% 50% / "+this._getCssSizing(a)+" no-repeat";return this.elemStyle.background='url("'+a.src+'") '+b+","+this.ss.cfg.background_style,this.elemStyle.transition="z-index 0s "+this.ss.cfg.fade_seconds+"s",this.elemStyle.zIndex=1,this.elemStyle.opacity=1,this.elemStyle.visibility="visible",this.ss.cfg.show_filename&&(this.filenameElem.innerHTML=a.src),this},hide:function(){var a=this.ss.cfg.fade_seconds;return this.elemStyle.transition="opacity "+a+"s,z-index 0s "+a+"s,visibility 0s "+a+"s",this.elemStyle.zIndex=0,this.elemStyle.opacity=0,this.elemStyle.visibility="hidden",this},_getCssSizing:function(a){{var b=this.elem.getBoundingClientRect(),c=b.bottom-b.top,d=b.right-b.left,e=a.naturalHeight,f=a.naturalWidth;Math.abs(c/d-e/f)}return.6*c>e&&.6*d>f?"auto":e>=c&&f>=d?"cover":.7*c>e||.7*d>f||Math.abs(c/d-e/f)>.5?"contain":"cover"}},g.prototype={},Object.getOwnPropertyNames(e.prototype).forEach(function(a){"_"!==a[0]&&(g.prototype[a]=function(){for(var b=0,c=this.slideshows.length;c>b;++b)this.slideshows[b][a]();return this})}),config.require("slideshow.conf",!1).then(d).catch(function(){})}(jQuery,window,document),function(a,b){"use strict";var c=b("#fade-in-cover");b(function(){a.setTimeout(function(){c.addClass("ready"),a.setTimeout(function(){c.remove()},1e3)},1500)})}(window,jQuery);