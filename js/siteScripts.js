//Слайдер фотографий кофейни OWL-SLIDER
;(function(){
   var themesPageContainer = $(".themes-page-container");
   var cafePhotoSlider = $(".cafe-photo-slider");
   var pageFrames_ln = $("[class$=page-frame]").length;
   var count = 0;

   //Переключение имён разделов
   window.pageTraveler = function(){
      
      var pageTitles = [
         'На главную',
         'О компании',
         'Меню',
         'Галерея',
         'Контакты'
      ];
      
      nameUpdate();

      function minus(){(count > 0) ? count-- : 0;}
      function plus(){(count < pageTitles.length-1) ? count++ : count = 0;}

      function pagePrev(){
         minus();
         nameUpdate();         
         themesPageContainer.trigger('to.owl.carousel', count);
      }

      function pageNext(){
         plus();
         nameUpdate();
         themesPageContainer.trigger('to.owl.carousel', count);
      }

      function nameUpdate(par){
         count = par || count;
         $('.fixed-footer-menu__list-item-EVENT.--left a')
            .text( (count-1 < 0) ? '' : pageTitles[count-1] );
         $('.fixed-footer-menu__list-item-EVENT.--right a')
            .text( (count+1 >= pageTitles.length) ? pageTitles[0] : pageTitles[count+1] );

         //Если на 1 слайде
         if(count == 0){
            $('.footer-arrow-navigation__arrow').addClass('active');
            $('.fixed-footer-menu__list-item-EVENT').css('display','none');
            $('.round-menu-caller').css('display','none');
            $('a.fixed-logo').css('display','none');
            //$('.fixed-mobile-menu-caller').css('display','none');
         }
         else {
            $('.footer-arrow-navigation__arrow').removeClass('active');
            $('.fixed-footer-menu__list-item-EVENT').css('display','block');
            $('.round-menu-caller').css('display','block');
            $('a.fixed-logo').css('display','block');
            //$('.fixed-mobile-menu-caller').css('display','block');
         }

         //Если на последнем слайде
         if(count == pageFrames_ln-1){
            $(".disable-owl-swipe").on("touchstart mousedown", function(e) {
               // Prevent carousel swipe
               e.stopPropagation();
           })
         }
      }

      pageTraveler.listing = function(event){
         if( $(event.target.closest('li') ).hasClass('--left') ){ pagePrev() }
         if( $(event.target.closest('li') ).hasClass('--right') ){ pageNext() }
      }

      //Внешнее упраление - Листание через меню
      pageTraveler.pagePrev = pagePrev;//Листать назад
      pageTraveler.pageNext = pageNext;//Листать вперёд
      pageTraveler.nameUpdate = nameUpdate;//Обновить ссылки лист меню
      pageTraveler.index = function(){return count};//Текущая цифра счётчика.
   }//pageTraveler Переключение имён разделов

   //Клики по галвном меню
   function mainMenuClick(){
      count = $(this).index()+1;
      themesPageContainer.trigger('to.owl.carousel', $(this).index()+1);
      pageTraveler.nameUpdate();
   }//Клики по галвном меню

   function roundedMenuClick(){
      count = 0;
      themesPageContainer.trigger('to.owl.carousel', 0);
      pageTraveler.nameUpdate();
   }

   pageTraveler();//Переключение имён разделов

   themesPageContainer.owlCarousel({
      items: 1,
      loop: false,
      rewind: true,
      mouseDrag: true,
      nav: false,
      dots: false,
   });
   //Листалка страниц сайта

   //Слайдер фотографий кофейни OWL-SLIDER
   cafePhotoSlider.owlCarousel({
      items: 1,
      loop: true,
      autoplay: false,
      autoplayTimeout: 7000,
      mouseDrag: false,
      touchDrag: false,
      nav: true,
      dots: true,
      dragClass: 'cafe-photo-slider__DRAG',
      grabClass: 'cafe-photo-slider__GRAB',
      stageClass: 'cafe-photo-slider__items-collection',
      stageOuterClass: 'cafe-photo-slider__items-wraper',
      loadedClass: 'cafe-photo-slider-LOADED'
   });//Слайдер фотографий кофейни OWL-SLIDER

   themesPageContainer.on('translated.owl.carousel', function(e){
      if( e.relatedTarget._drag.direction == 'left' ){
         count = e.item.index;
         themesPageContainer.trigger('to.owl.carousel', count);
         pageTraveler.nameUpdate();
      }
      if( e.relatedTarget._drag.direction == 'right' ){
         count = e.item.index;
         themesPageContainer.trigger('to.owl.carousel', count);
         pageTraveler.nameUpdate();
      }
   });

   $('.fixed-footer-menu').on('click', pageTraveler.listing );
   $('.index-page-menu__list-item').on('click', mainMenuClick );
   $('.round-menu-caller, .fixed-logo').on('click', roundedMenuClick );
}());

;(function(){
   var img_ln = $('img').length;

   function hidePreloader(){
      var preloader = $('.site-preloader');
      if( !preloader.hasClass('removed') ) preloader.addClass('removed');
   }

   setTimeout(hidePreloader, 1000);
}());

//Яндекс карты
;(function(){
   //Яндекс карты
   ymaps.ready(init);

   var myMap;
   
   function init(){
      myMap = new ymaps.Map("yaMap", {
         center: [59.934844, 30.337616],
         controls: [],
         zoom: 18
      });
      
      // Создание метки с квадратной активной областью.
      var squareLayout = ymaps.templateLayoutFactory.createClass('<div class="map-marker"     id="mapMark"><div class="map-marker-adress" id="adresa"><p class="map-marker-adress__paragraph">м. Гостинный двор ул.Малая Садовая д.3.54</p><a class="map-marker-adress__link" href="tel:+78123698459">+7&nbsp;(812)&nbsp;369-84-59</a><a class="map-marker-adress__link --contact-us" href="#">Написать нам</a><ul class="map-marker-adress__socials" id="mapStl"><li></li><li></li></ul><p class="map-marker-adress__paragraph">Работаем 24 часа без выходных и праздников и без обеда</p></div></div>');

      var squarePlacemark = new ymaps.Placemark(
         [59.934844, 30.337616], {
            hintContent: 'Кофейня'
         }, {
            iconLayout: squareLayout,
            // Описываем фигуру активной области "Прямоугольник".
            iconShape: {
               type: 'Rectangle',
               // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
               coordinates: [
                  [0, 0],
                  [0, 0]
               ]
            }
         }
      );

      function resized(){
         $(".themes-page-container").trigger('refresh.owl.carousel');
      }

      $(window).on('resize', resized)

      myMap.geoObjects.add(squarePlacemark);
   }
}());//Яндекс карты