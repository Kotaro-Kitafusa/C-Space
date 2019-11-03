$(function(){


  function buildMSG(msg) {
    var content = msg.content ? `<p class="messages__box__message">${ msg.content }</p>` : "";
    var img = msg.image ? `<img class="messages__box__image" src="${msg.image}"> `: "";
    var html = `<div class="messages__box" data-message-id =${msg.id}>
                  <p class="messages__box__user-name">
                    ${msg.user_name}
                  </p>
                  <p class="messages__box__posted-time">
                    ${msg.created_at}
                  </p>
                  ${content}
                  ${img}
                  </div>`
     return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(msg){
      var html = buildMSG(msg);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
      $('.form__input__send').prop('disabled', false)
    })
    .fail(function(){
      aleart('error')
    })
  })

  var reloadMessages = function(){
    last_message_id = $('.messages__box').last().data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        var insertHTML = buildMSG(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
      });
    })
    .fail(function(){
      alert('Error!');
    })
  };

   if($('.main-header__group-name').data('group-name')){
    setInterval(reloadMessages, 3000);
   }
});