/*
Недавно понадобилось написать небольшой скрипт
На сайте есть select, который по плану нужно было стилизовать в соответствии с дизайном
Но через CSS больно сильно его не стилизуешь. Сайт сверстан на Webflow, в нем есть свой виджет Dropdown
Я пришел к решению, что можно его использовать наряду с select
Сам select будет скрытым, а скрипт будет парсить его options и заполнять Dropdown
При клике на элемент в Dropdown соответствующему тегу option присваивается атрибут selected
Плюс еще было пара небольших модификаций. 
Так при клике по ссылке конкретной услуги в Dropdown и select должен быть выбран соответвующий пункт.
*/

$(function(){
  let select = $(".select-field.w-select");
  let parent = select.closest('.div-block-11');
  let dropdown = parent.children('.dropdown.w-dropdown');
  let toggle = dropdown.children('.dropdown-toggle.w-dropdown-toggle').children('div');
  let nav = dropdown.children('.dropdown-list.w-dropdown-list');
  let options = select.find('option');
  let mainlinks = $('.link-main-serv');
  let navlinks = document.getElementsByClassName('dropdown-link');
  
  function dropdownFilling(nav, options, toggle){
    nav.html('');
    mainlinks.each(function(i){
      $(this).attr('data-index', i);
    });
    options.each(function(i){
      let value = $(this).val();
      let text = $(this).text();
      if(i === 0){
        toggle.text(text);
      }
      let html = '<a href="#" class="dropdown-link w-dropdown-link" tabindex="-1" role="menuitem" style="outline: currentcolor none medium;" data-value="'+value+'" data-index="'+i+'">'+text+'</a>';
      nav.append(html);
    });
  }
  
  $(document).on('click', '.dropdown-link.w-dropdown-link', function(){
    let value = $(this).attr('data-value');
    let text = $(this).text();
    let index = $(this).attr('data-index');
    options[index].selected = true;
    toggle.text(text);
    $('.dropdown-toggle').css({'color': '#221156','border-bottom': '2px solid #221156'});
    $('.dropdown-link.w-dropdown-link').each(function(){
    	$(this).removeClass('active');
    });
    $(this).addClass('active');
    $('.dropdown-list').hide('w--open');
  });
  
  $('.dropdown.w-dropdown').click(function(){
  	$('.dropdown-list').toggle();
  });
  
  $(document).on('click', '.close-out, .close', function(){
    clear();
    $('.dropdown-toggle').removeAttr('style');
  });
  
  $(document).on('click', '.link-main-serv', function(){
    let index = Number($(this).attr('data-index'))+1;
    toggle.text(options[index].text);
    $('.dropdown-toggle').css({'color': '#221156','border-bottom': '2px solid #221156'});
    if(navlinks[index].dataset.index == index){
      navlinks[index].className += ' active';
    }
    options[index].selected = true;
  });
  
  $(document).on('click', '.btn-brif', function(){
    let index = Number($(this).attr('data-index'))+1;
    if(index == -1 || index === undefined) { // Custom
      clear();
    }
    brifBtn($(this), index);
  });
  
  function brifBtn(obj, i){
    let text = obj.closest('.column-text').children('h3').text();
    [].forEach.call(navlinks, function(el) {
      el.classList.remove('active');
    });
    navlinks[i].className += ' active';
    toggle.text(options[i].text);
    $('.dropdown-toggle').css({'color': '#221156','border-bottom': '2px solid #221156'});
    options[i].selected = true;
  }
  
  function clear(){
    dropdownFilling(nav, options, toggle);
    options[0].selected = true;
	$('.dropdown-list').hide('w--open');
  }
	
  dropdownFilling(nav, options, toggle);
  
});
