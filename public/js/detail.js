$(function(){
    $('.comment').click(function(e){
        var target = $(this)
        var toId = target.data('tid')
        var commontId = target.data('cid')
        if($('#toId').length>0){
            $('#toId').val(toId)
        }else{
            $('<input>').attr({
                type:'hidden',
                id:'toId',
                name:'comment[tid]',
                value:toId
            }).appendTo('#commentForm')
        }
        if($('#commonId').length>0){
            $('#commonId').val(commonId)
        }else{
            $('<input>').attr({
                type:'hidden',
                id:'commonId',
                name:'comment[cid]',
                value:commontId
            }).appendTo('#commentForm')
        }
    })
})