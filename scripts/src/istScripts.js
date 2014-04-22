function forEach(object, callback){
	var i, l = object.length, x;
	if(l === undefined){
		for(x in object){
			if(callback.call(object[x], x, object[x]) === false){
				break;
			}
		}
	}
	else{
		for(i = 0, x = object[0]; i < l && callback.call(x, i, x) !== false; x = object[++i]){
		}
	}
}
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

/**
 * kolorowanie wierszy <ul>
 */
var istStripeUl = {
	init: function() {
		var parent = document.getElementsByTagName("ul");
		for(var i=0, j=parent.length; i<j; i++) {
			if (parent[i].className.match("stripeMe")) {
				var el = parent[i].getElementsByTagName("li");
				for(var k=0, l=el.length; k<l; k++) {
					if(k%2) addClass(el[k],'even');
					else addClass(el[k],'odd');
				}
			}
		}
	}
}

/**
 * galeria w produkcie
 */
var istGallery = {
	thumbs: 0,
	init: function(x){
		istGallery.thumbs = x;
    x = document.getElementById('iStoreProductGalleryThumbs');
    if(x){
    	document.getElementById('iStoreProductGalleryControls').style.display = 'block';
    	removeClass(document.getElementById('iStoreProductGalleryThumbs'), 'gallScroll');
			if(document.getElementById('iStoreProductGalleryPhoto')){
				forEach(x.getElementsByTagName('a'), function(){
					this.target = '';
					this.onclick = function(){

					hmm = document.getElementById('iStoreProductGalleryPhoto').getElementsByTagName('a')[0];
					hmm.href = this.getElementsByTagName('img')[0].src.replace(/thumbnail/, 'big');

					var bigImgType = 'midi';
					var bigImgSrc = hmm.getElementsByTagName('img')[0].src;
					if (bigImgSrc.indexOf('big') > -1){
						bigImgType = 'big';
					}

					var x = new Image(), y = document.getElementById('iStoreProductGalleryPhoto').getElementsByTagName('img')[0];
					x.src = this.getElementsByTagName('img')[0].src.replace(/thumbnail/, bigImgType); /* uwaga: w razie potrzeby zmienic ! */
					y.src = x.src;
					this.blur();
					return false;
					};
				});
			}
			x = x.getElementsByTagName('li');

			if(x.length > istGallery.thumbs){
				document.getElementById('iStoreProductGalleryControls').style.display = 'block';
				document.getElementById('iStoreProductGalleryControlPrev').style.display = 'none';
        document.getElementById('iStoreProductGalleryControlPrev').getElementsByTagName('a')[0].onclick = function(){
					istGallery.prev();
					this.blur();
					return false;
				};
				document.getElementById('iStoreProductGalleryControlNext').getElementsByTagName('a')[0].onclick = function(){
					istGallery.next();
					this.blur();
					return false;
				};
				forEach(x, function(i){
					this.style.display = (i >= istGallery.thumbs) ? 'none' : 'block';
				});
			}
      else {
				document.getElementById('iStoreProductGalleryControls').style.display = 'none';
      }
		}
	},
	controls: function(x){
		document.getElementById('iStoreProductGalleryControlPrev').style.display = (x[0].style.display == 'none') ? 'block' : 'none';
		document.getElementById('iStoreProductGalleryControlNext').style.display = (x[x.length-1].style.display == 'none') ? 'block' : 'none';
	},
	prev: function(){

		var i, x = document.getElementById('iStoreProductGalleryThumbs').getElementsByTagName('li');
		if(x[0].style.display == 'none'){
			for(i = x.length - 1; i >= 0; i--){
				if(x[i].style.display != 'none'){
					x[i].style.display = 'none';
					break;
				}
			}
			for(i--; i >= 0; i--){
				if(x[i].style.display == 'none'){
					x[i].style.display = 'block';
					break;
				}
			}
		}
		istGallery.controls(x);
	},
	next: function(){
		var i, x = document.getElementById('iStoreProductGalleryThumbs').getElementsByTagName('li');
		if(x[x.length-1].style.display == 'none'){
			for(i = 0; i < x.length; i++){
				if(x[i].style.display != 'none'){
					x[i].style.display = 'none';
					break;
				}
			}
			for(i++; i < x.length; i++){
				if(x[i].style.display == 'none'){
					x[i].style.display = 'block';
					break;
				}
			}
		}
		istGallery.controls(x);
	}
};

/**
 * ocena produktu - gwiazdki
 */
var istStars = {
	init: function(){
		var x = document.getElementById('addOpinion');
		if(x){
			forEach(x.getElementsByTagName('select'), function(){
				var html = '<ul class="rating" onmouseover="this.className = \'rating rating-active\';" onmouseout="this.className = \'rating rating-inactive\';">';
				forEach(this.getElementsByTagName('option'), function(){
					html += '<li class="star-' + this.value + '"><a href="#" title="' + this.text + '" onclick="return istStars.select(this, ' + this.value + ');">' + this.text + '</a></li>';
				});
				html += '</ul>';
				this.style.display = 'none';
				this.parentNode.getElementsByTagName('label')[0].style.cursor = 'text';
				this.parentNode.innerHTML += html;
			});
		}
	},
	select: function(el, val){
		var x = el.parentNode.parentNode;
		forEach(x.getElementsByTagName('a'), function(){
			this.className = '';
		});
		x.className = 'rating rating-inactive';
		el.className = 'selected';
		forEach(x.parentNode.getElementsByTagName('select')[0].getElementsByTagName('option'), function(){
			this.selected = (this.value == val);
		});
		el.blur();
		return false;
	}
};

/**
 * rozwijanie menu jezykow i walut w ie6 (hover bug)
 */
/*@cc_on @*/
/*@if (@_jscript_version < 5.8)
if (navigator.userAgent.toLowerCase().indexOf("msie 6.0") != -1) {
	var lB = document.getElementById("langBox"),
		lS = document.getElementById("langSelect"),
		cB = document.getElementById("currBox"),
		cS = document.getElementById("currSelect");
	lB.onmouseenter = function () { lS.style.display = "block" };
	lB.onmouseleave = function () { lS.style.display = "none" };
	cB.onmouseenter = function () { cS.style.display = "block" };
	cB.onmouseleave = function () { cS.style.display = "none" };
}
/*@end @*/

/**
 * zaawansowana wyszukiwarka
 */
var istAdvSearch = {
	status: '',
	searchForm: '',
	searchLink: '',
	init: function () {
		var box = document.getElementById("istTopSearch").getElementsByTagName("div")[0];
		var el = box;
		var boxPos = {x: 0, y: 0};
		while (el) {
			boxPos.x += el.offsetLeft;
			boxPos.y += el.offsetTop;
			el = el.offsetParent;
		}
		var x = document.getElementById("istAdvSearch");

		x.style.top = boxPos.y + 41  + "px";
		x.style.left = boxPos.x + "px";
		x.style.width = box.offsetWidth + "px";

		// zapełnianie warstwy
		this.searchForm = document.getElementById("istAdvSearchContent");
		if (this.searchForm) {
			//x.appendChild(this.searchForm);
			this.status = "hidden";
		}

		var span = document.createElement("span");
		span.className = "istBot";
		x.appendChild(span);

		this.searchLink = document.createElement("a");
		this.searchLink.innerHTML = "wyszukiwarka zaawansowana";
		var that = this;
		this.searchLink.onclick = function () { that.changeView() };

		var linkwrap = document.createElement("div");
		linkwrap.id = "istAdvSearchLink";
		linkwrap.appendChild(this.searchLink);

		var span = document.createElement("span");
		span.className = "istBot";
		span.appendChild(document.createElement("span"));
		linkwrap.appendChild(span);

		x.appendChild(linkwrap);
	},
	changeView: function () {
		if (this.status === "hidden") {
			this.searchForm.style.display = "block";
			this.searchLink.innerHTML = "ukryj opcje zaawansowane";
			this.searchLink.className = "istHide";
			this.status = "visible";
		} else if ( this.status === "visible") {
			this.searchForm.style.display = "none";
			this.searchLink.innerHTML = "wyszukiwarka zaawansowana";
			this.searchLink.className = "istShow";
			this.status = "hidden";
		}
		return false;
	}
}

/**
 *	Boks z parametrami produktów, przed przejściem do koszyka
 */
var istParamCart = {
	box: 0,
	root: '',
	init: function () {
		var list = document.getElementById("istItemsIcon") || document.getElementById("istItemsList");
		if (list !== null) {
			var that = this;
			forEach(list.getElementsByTagName('a'), function () {
				if ( hasClass(this, 'withParam') ) {
					this.onclick = function () {
						that.showBox(this);
						return false;
					}
				}
			});
		}
	},
	showBox: function (el) {
		for ( var x = el.parentNode.parentNode.lastChild; x != null; x = x.previousSibling ) {
			if (x.nodeType == 1) {
				if (y = x.getElementsByTagName("form")[0]) {
					this.prepareBox(x, y);
				}
				break;
			}
		}
	},
	prepareBox: function (el, cont) {
		if (!this.box) {
			this.box = document.createElement("div");
			this.box.id = "istPopup";
			document.body.appendChild(this.box);
			var that = this, close = document.createElement("span");
			close.id = "closePopup";
			close.innerHTML = "X";
			close.onclick = function () { that.closeBox() };
			document.body.onkeydown = function (e) {
				if (window.event) {
					keynum = e.keyCode;
				} else if (e.which) {
					keynum = e.which;
				}
				if (keynum == 27) { that.closeBox() };
			};
			this.box.appendChild(close);
		} else {
			this.box.style.display = "block";
		}
		this.root = el;
		this.box.appendChild(cont);
		this.box.style.left = ((window.innerWidth || document.documentElement.clientWidth) - this.box.offsetWidth) / 2 + (window.pageXOffset || document.documentElement.scrollLeft) + "px";
		this.box.style.top = ((window.innerHeight || document.documentElement.clientHeight) - this.box.offsetHeight) / 2 + (window.pageYOffset || document.documentElement.scrollTop) + "px";
	},
	closeBox: function () {
		this.box.style.display = "none";
		this.root.appendChild(this.box.getElementsByTagName("form")[0]);
		document.body.onkeydown = "";
	}
};

var productId;
var langId;

function deleteFromNotepad(id) {
  productId = id;
  var ajax = new istAjax();
  ajax.setCallBackMethod('changeNotepadLinkToAdd');
  ajax.invoke('/notepad/delete?id='+id);
  return false;
}

function changeNotepadLinkToAdd(status) {
  if (status == 1) {
	  elem = document.getElementById('notepad');
	  elem.className = 'iStoreNotepadAddToList';
	  elem.onclick = function() {
	    return addToNotepad(productId, langId);
	  };
	  elem.innerHTML = "Dodaj do listy zakupów";
  }
}

function changeNotepadLinkToRemove(status) {
  if (status == 1) {
	  elem = document.getElementById('notepad');
	  elem.className = 'iStoreNotepadDeleteFromList';
	  elem.onclick = function() {
	    return deleteFromNotepad(productId, langId);
	  };
	  elem.innerHTML = "Usuń z listy zakupów";
	}
}

function addToNotepad(id) {
  productId = id;
  var ajax = new istAjax();
  ajax.setCallBackMethod('changeNotepadLinkToRemove');

  var props = "";
  $$('select').each(function(element, index){
    if (String(element.name).test('Prop')) {
      props = props+element.get('id')+"-"+element.getSelected()[0].get('value')+"|";
    }
  });

  ajax.invoke('/notepad/add?id='+id+'&props='+props);
  return false;
}

/**
 * Funkcja ustawia dlugosci kolumn w skelpie
 * pilnuje, zeby glowny content nie byl krotszy
 * od lewej kolumny
 *
 * Funkcja wykorzystuje MooTools!
 *
 * @author: Kuba Zgolinski
 */
function setColumnWidths() {
	// dla stron statycznych
	leftColWidth = $('istContentWrap').getHeight();
	mainColWidth = $$('#istWrap #istContentWrap .istContent #istStatic .istBoxWrap').getHeight();
	if (leftColWidth > mainColWidth)
		$$('#istWrap #istContentWrap .istContent #istStatic .istBoxWrap').setStyle('height', (parseInt(leftColWidth)-15));
}

/* simple layouts JS */
function enableSimpleHeader() {
    var iStoreTop = jQuery('#iStoreTop').wrap('<div id="iStoreTopWrapper">'),
        iStoreStatusBarWrapper = jQuery('#iStoreStatusBarWrapper'),
        iStoreStatusBar = iStoreStatusBarWrapper.children('#iStoreStatusBar'),
        iStoreStatusMenu = iStoreStatusBar.children('#iStoreStatusMenu'),
        iStoreWrapper = jQuery('#iStoreWrapper'),
        iStoreTopWrapper = jQuery('#iStoreTopWrapper'),
        iStorePosition = iStoreTop.outerHeight() + iStoreStatusBar.outerHeight(),
        mobileTempPadding = 0, mobile = false,
        iStoreCategoriesSelect = jQuery('#iStoreCategoriesBox .iStoreBoxContent'),
        iStoreToolbarMenuNav = jQuery('#iStoreToolbarMenu .nav'),
        iStoreToolbarMenuUlCountItems = jQuery('#iStoreToolbarMenu ul li').length,
        iStoreToolbarMenuUlHeight = iStoreToolbarMenuUlCountItems * 50 + iStoreToolbarMenuUlCountItems - 1;

    if (checkResolution() === 'mobile') {
        mobile = true;
        mobileTempPadding = 156;
    }

    iStoreToolbarMenuNav.click(function() {
        if (iStoreToolbarMenuNav.hasClass('show')) {
            iStorePosition = iStorePosition + iStoreToolbarMenuUlHeight;
        } else {
            iStorePosition = iStorePosition - iStoreToolbarMenuUlHeight;
            if (iStoreTopWrapper.hasClass('fixed')) {
                var actualPadding = iStoreWrapper.css('padding-top');
                iStoreWrapper.css('padding-top', function (index, actualPadding) {
                    return parseInt(actualPadding, 10) - iStoreToolbarMenuUlHeight + 'px';
                });
            }
        }
    });


    jQuery(window).resize(function() {
        if ( !(iStoreTopWrapper.hasClass('fixed')) ) {
            iStorePosition = iStoreTop.outerHeight() + iStoreStatusBar.outerHeight();
        }

        if (checkResolution() === 'mobile') {
            mobile = true;
            mobileTempPadding = 156;
            iStoreCategoriesSelect.show();
        } else {
            mobile = false;
            mobileTempPadding = 0;
        }
    });

    jQuery(window).scroll(function () {
        if ( jQuery(this).scrollTop() > (iStorePosition + mobileTempPadding) ) {
            if ( !(iStoreTopWrapper.hasClass('fixed')) ) {
                iStoreWrapper.css('padding-top', iStorePosition);
                iStoreStatusBarWrapper.addClass('fixed');
                iStoreTopWrapper.hide().addClass('fixed').fadeIn();
                iStoreStatusMenu.hide().fadeIn();
                if (checkResolution() === 'mobile') {
                    iStoreCategoriesSelect.hide();
                }
            }
        } else {
            if ( iStoreTopWrapper.hasClass('fixed') ) {
                iStoreWrapper.css('padding-top', 0);
                iStoreStatusBarWrapper.removeClass('fixed');
                iStoreTopWrapper.removeClass('fixed');
                if (checkResolution() === 'mobile') {
                    iStoreCategoriesSelect.show();
                }
            }
        }
    });
}

function enableSimpleFooter() {
    var footerTriggerObject = jQuery('#iStoreFooter .copyrights');
    jQuery('#iStoreShopNewsletter .submit').empty();
    jQuery('.footerSection6').click(function() {
        if (checkResolution() === 'tablet' || checkResolution() === 'desktop') {
            var elements = jQuery('.footerSection1, .footerSection2, .footerSection3, .footerSection4, .footerSection5'),
                footerLists = jQuery('#iStoreFooter ul'),
                newsletter = jQuery('#iStoreNewsletterBox'),
                additionalText = jQuery('.footerSection7'),
                iStoreFooter = jQuery('#iStoreFooter'),
                iStoreBox = jQuery('#iStoreFooter .iStoreBox'),
                that = jQuery(this);

            if ( that.hasClass('shown') ) {
                elements.fadeOut();
                if( newsletter.css('position') === 'absolute' ) {
                    newsletter.hide();
                }
                additionalText.hide();
                iStoreFooter.animate({
                    height: "50px"
                });
                iStoreBox.animate({
                    height: "50px"
                });
                that.removeClass('shown');
            } else {
                that.addClass('shown');
                iStoreFooter.animate({
                    height: "274px"
                });
                iStoreBox.animate({
                    height: "274px"
                },
                function () {
                    elements.fadeIn();
                    footerLists.fadeIn();
                    if( newsletter.css('position') === 'absolute' ) {
                        newsletter.fadeIn();
                    }
                    additionalText.fadeIn();
                });
                jQuery('html, body').animate({
                    scrollTop: jQuery(document).height()
                }, 400);
            }
        }
    });

    jQuery('#iStoreFooter h3').click(function () {
        if (checkResolution() === 'mobile') {
            var that = jQuery(this);
            if (that.hasClass('shown')) {
                that.next('ul').stop(true, true).slideUp();
                that.removeClass('shown');
            } else {
                that.next('ul').stop(true, true).slideDown();
                that.addClass('shown');
            }
        }
    });
}

function showMenu() {
    var iStoreToolbarMenu = jQuery('#iStoreToolbarMenu'),
        iStoreToolbarMenuUl = jQuery('#iStoreToolbarMenu ul'),
        iStoreToolbarMenuNav,
        iStoreSidebar = jQuery('#iStoreSidebar'),
        iStoreHeader = jQuery('#iStoreHeader'),
        iStoreContent = jQuery('#iStoreContent'),
        iStoreBreadCrumbs = jQuery('#iStoreBreadCrumbs'),
        iStoreWrapper = jQuery('#iStoreWrapper');
        iStoreTopWrapper = jQuery('#iStoreTopWrapper');

    iStoreToolbarMenu.prepend(jQuery('<a href="#menu" class="nav"></a>'));
    iStoreToolbarMenuNav = jQuery('#iStoreToolbarMenu .nav');
    iStoreToolbarMenuUl.css('width','100%');
    iStoreToolbarMenuNav.click(function (){
        var that = jQuery(this);
        if ( iStoreToolbarMenuNav.hasClass('show') ) {
            iStoreToolbarMenuUl.stop(true, true).slideToggle();
            that.removeClass('show');
            if( iStoreSidebar.css('position') === 'absolute' ) {
                if(jQuery('body').is('.iStoreHome')) {
                    iStoreContent.css('padding-top','153px');
                    iStoreHeader.css('padding-top','0px');
                    iStoreSidebar.css('top','215px');
                } else {
                    iStoreHeader.css('padding-top','0px');
                    iStoreSidebar.css('top','215px');
                }
            }
        }
        else {
            iStoreToolbarMenuUl.stop(true, true).slideToggle();
            that.addClass('show');
            if( iStoreSidebar.css('position') === 'absolute' ) {
                var widthMenu = iStoreToolbarMenuUl.width();
                var widthSite = iStoreWrapper.width();
                if(widthMenu < widthSite){
                    iStoreToolbarMenuUl.css('width',widthMenu + 100);
                }

                if(jQuery('body').is('.iStoreHome')) {
                    iStoreContent.css('padding-top','153px');
                    iStoreHeader.css('padding-top','313px');
                    iStoreSidebar.css('top','529px');
                } else if ( iStoreTopWrapper.hasClass('fixed') ) {
                    iStoreHeader.css('padding-top','313px');
                    iStoreSidebar.css('top','215px');
                } else {
                    iStoreHeader.css('padding-top','313px');
                    iStoreSidebar.css('top','529px');
                }
            }
        }
    });
}

function fitHeader() {
    var iStoreContent = jQuery('#iStoreContent'),
        iStoreHeader = jQuery('#iStoreHeader'),
        iStoreSidebar = jQuery('#iStoreSidebar'),
        body = jQuery('body'),
        iStoreToolbarMenuNav = jQuery('#iStoreToolbarMenu .nav'),
        iStoreToolbarMenuUl = jQuery('#iStoreToolbarMenu ul');

    if (checkResolution() === "mobile") {
        if (body.hasClass('iStoreHome')) {
            iStoreContent.css('padding-top', 156);
        }
        if (iStoreToolbarMenuNav.hasClass('show')) {
            iStoreHeader.css('padding-top', 313);
            iStoreSidebar.css('top', 529);
        } else {
            iStoreSidebar.css('top', 215);
        }
    } else if (checkResolution() === "tablet") {
        if (body.hasClass('iStoreHome')) {
            iStoreContent.css('padding-top', 0);
        }
        if (iStoreToolbarMenuNav.hasClass('show')) {
            iStoreHeader.css('padding-top', 0);
        } else {
            iStoreToolbarMenuUl.hide();
        }
    } else if (checkResolution() === "desktop") {
        if (body.hasClass('iStoreHome')) {
            iStoreContent.css('padding-top', 0);
        }
        if (iStoreToolbarMenuNav.hasClass('show')) {
            iStoreHeader.css('padding-top', 0);
        }
        iStoreToolbarMenuUl.show();
    }
}

function fitMenu() {
    var iStoreToolbarMenuUl = jQuery('#iStoreToolbarMenu ul'),
        iStoreToolbarMenuNav = jQuery('#iStoreToolbarMenu .nav'),
        iStoreWrapper = jQuery('#iStoreWrapper');
        if (checkResolution() === 'mobile') {
            iStoreToolbarMenuUl.css('width', iStoreWrapper.width());
        } else {
            iStoreToolbarMenuUl.css('width', '100%');
        }
}

function fitFooter() {
    var elements = jQuery('.footerSection1, .footerSection2, .footerSection3, .footerSection4, .footerSection5'),
        ownText = jQuery('.footerSection7'),
        newsletter = jQuery('#iStoreNewsletterBox'),
        footer = jQuery('#iStoreFooter'),
        footerLists = jQuery('#iStoreFooter ul'),
        iStoreBox = jQuery('#iStoreFooter > .iStoreBox'),
        trigger = jQuery('.footerSection6');

    if (checkResolution() === "mobile") {
        elements.show();
        footer.css('height', 'auto');
        iStoreBox.css('height', 'auto');
        newsletter.hide();
        jQuery('#iStoreFooter .footerSection4, #iStoreFooter .footerSection5').hide();
        trigger.removeClass('shown');
        jQuery('#iStoreFooter h3 + ul').hide();
        jQuery('#iStoreFooter h3.shown + ul').show();
    } else if (checkResolution() === "tablet") {
        elements.hide();
        ownText.hide();
        if (trigger.hasClass('shown')) {
            elements.show();
            ownText.show();
        } else {
            footer.css('height', 50);
            iStoreBox.css('height', 50);
        }
    } else {
        newsletter.hide();
        ownText.hide();
        if (trigger.hasClass('shown')) {
            elements.show();
            ownText.show();
            footerLists.show();
            newsletter.show();
        } else {
            footer.css('height', 50);
            iStoreBox.css('height', 50);
        }
    }
}

function enableMyAccountFormHints() {
    var inputItem = jQuery('#iStoreEditAccount .text input');
    inputItem.focus(function() {
        jQuery(this).next('.info').stop(true, true).fadeIn();
    });
    inputItem.blur(function() {
        jQuery(this).next('.info').stop(true, true).fadeOut();
    });
}

function enableMyAccountAsynTabs() {
    jQuery('body').prepend('<div id="iStoreAjaxLoader"></div>');

    var iStoreMyAccount = jQuery('#iStoreMyAccount'),
        iStoreTabs = iStoreMyAccount.find('.iStoreTabs'),
        iStoreTabsListElem = iStoreTabs.find('li'),
        iStoreTabsHplink = iStoreMyAccount.find('.iStoreTabs a'),
        iStoreAjaxLoader = jQuery('#iStoreAjaxLoader'),
        tempTarget, mobile = false,
        windowWidth = Math.max( jQuery(window).width(), window.innerWidth );

    if (windowWidth <= 767) {
        mobile = true;
        jQuery('#iStoreEditAccountBox').remove();
        iStoreTabsListElem.removeClass('selected');
    }

    iStoreTabsHplink.click(function (e) {
        e.preventDefault();
        tempTarget = jQuery(this);
        if (tempTarget.parent('li').hasClass('selected')) {
            if (mobile) {
                tempTarget.next('.iStoreBox').remove();
                tempTarget.parent('li').removeClass('selected');
            }
        } else {
            iStoreAjaxLoader.fadeIn();
            jQuery.ajax({ url: tempTarget.attr('href') })
                .success(function(result) {
                    iStoreTabs.find('li').removeClass('selected');
                    tempTarget.parent('li').addClass('selected');
                    iStoreAjaxLoader.hide();
                    var $result = jQuery(result).find('#iStoreMyAccount .iStoreTabs + .iStoreBox');
                    if ($result.length) {
                        if (mobile) {
                            iStoreTabsHplink.next('.iStoreBox').remove();
                            tempTarget.after($result);
                            tempTarget.next('.iStoreBox').hide().slideDown();
                        } else {
                            iStoreTabs.next('.iStoreBox').remove();
                            iStoreTabs.after($result);
                            iStoreTabs.next('.iStoreBox').hide().fadeIn();
                            enableMyAccountFormHints();
                        }
                    }
                });
        }
    });
}

function checkResolution() {
    var windowWidth = Math.max( jQuery(window).width(), window.innerWidth ),
    device = "";

    if (windowWidth <= 767) {
        device = "mobile";
    } else if (windowWidth <= 1024) {
        device = "tablet";
    } else {
        device = "desktop";
    }

    return device;
}

jQuery( document ).ready(function() {

    /**
     * funkcje wywolywane onload
     */
    istStripeUl.init();
    istGallery.init(2);
    istStars.init();
	//istAdvSearch.init();
    istParamCart.init();
	//setColumnWidths();

    var layoutName = jQuery('body.simple');
    if (layoutName.length) {
    	showMenu();
        if( !(jQuery('html')).hasClass('lt-ie9') ) {
            enableSimpleHeader();
        }
        enableSimpleFooter();
        enableMyAccountFormHints();

        jQuery( window ).resize(function() {
            fitHeader();
            fitMenu();
            fitFooter();
        });
    }
});



