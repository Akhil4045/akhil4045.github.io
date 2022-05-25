$(() => {
    let sections = $(".nav-class"), navigation_links = $("#navul a");
    sections.waypoint({
        handler: function (event, direction) {
            let active_section, active_link;
            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();
            active_link = $('#navul a[href="#' + active_section.attr("id") + '"]');
            if (active_section.attr("id") != 'home-div') $('header').addClass("hclass");
            else $('header').removeClass("hclass");
            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        },
        offset: '35%'
    });

    $('.main-div-text').children().each((index, element) => {
        setTimeout(() => {
            if ($(element).is('span') || $(element).is('img')) {
                $(element).is('span')? $(element).addClass('animated rubberBand'): $(element).addClass('a-img-animation');
                setTimeout(()=> {
                    $(element).is('span')? $(element).removeClass('animated rubberBand'): $(element).removeClass('a-img-animation');
                }, 1500);
            }
        }, index * 250);
    });

    bindElements();
});

var bindElements = function() {
    $('.name-class').hover((e)=> { 
        $(e.target).addClass('animated rubberBand');
     }, (e) => { 
        $(e.target).removeClass('animated rubberBand');
    });

    $('.con-control').focusout((el) => {
        if($(el.target).val() == '') 
            $(el.target).removeClass('notEmpty');
        else
            $(el.target).addClass('notEmpty');
    });

    $('.con-control').change((el) => {
        $(el.target).removeClass('fill');
    });
}

var sendMessage = function() {
    let data = {}, valid = true,
        phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    $('.cdiv-form input, textarea').each((i, el) => {
        let elName = $(el).attr('name'), val = $(el).val().trim();
        if (val) {
            if ((elName == 'phone' && !val.match(phoneRegex)) || (elName == 'email' && !val.match(emailRegex))) { 
                valid = false; 
                $(el).addClass('fill'); 
            }
            data[elName] = val;
        }
        else {
            valid = false; 
            $(el).addClass('fill');
        }
    });

    if (!valid) return false;
    $('.cdiv-form input, textarea').removeClass('fill'); $('.cdiv-form input, textarea').val('');
}