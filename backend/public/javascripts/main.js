$(function(){

	// this ajax call will not be called on any user event, it will be called as soon as page is loaded
	$.ajax({
		method:'GET',
		url:'api/videos',
		success: function(videos){

			$.each(videos, function(i, video){
				$("#videolist").append('<li>' + video.title + '</li>');

				// $("#videolist").append('<li style="list-style-type:none; float:left; padding: 16px"><img src="../images/' + video.image + '" style="width: 200px; height:200px"><br>' + video.title + '</li>');
			}); 
		},
		error: function(){
			alert("Error loading videos");
		}
	});

	// ajax call for add button in form (main.html)
	$("#add").click(function(){

		// retrieve form data first before we make the ajax call
		var vtitle = $("#title").val();
		var vgenre = $("#genre").val();
		var vdesc = $("#desc").val();

		// create a new js object
		var video = {
			title: vtitle,
			genre: vgenre,
			desc: vdesc
		}

		// when we want to send data, then we'll use data parameter in the ajax call
		$.ajax({
			method:'POST',
			url:'api/videos',
			data: video,
			success: function(newVideo){
				$("#videolist").append('<li>' + newVideo.title + '</li>');
			},
			error: function(){
				alert("Error loading videos");
			}
		});

	});



});