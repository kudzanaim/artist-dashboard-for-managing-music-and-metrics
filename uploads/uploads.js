var Uploads = {
    markUp: function(type_){

        var output_single = `
            <div class="upload_music_container"> 
                <h1 class="headerTest">Upload Music</h1>
                <div class="uploadPageContainer">   </div>
            </div>
            <div class="panePrevCont">
                <h1 class="paneHeader">Preview Pane</h1>
                <div class="lineStyler2">    <div class="L_one1"></div>     </div>
                <div class="no_image">     <p>No Artwork Set</p>   </div>

                <div class="paneItemCont">  
                    <img onchange="" class="test_image" src=null>
                    <audio class="song_player" src=null></audio>
                    <div class="prevMeta">
                        <div class="prevSongTitle"><span class="labelprev">Title:</span><div class="prevValue"> </div></div>
                        <div class="prevArtist"><span class="labelprev">Artist: </span><div class="prevValue"></div></div>
                        <div class="prevProducers"><span class="labelprev">Prod By: </span><div class="prevValue"></div></div>
                        <div class="prevSongYear"><span class="labelprev">Year: </span><div class="prevValue"></div></div>
                    </div>
                    <div class="audioPrevCont ripple2"> 
                        <div class="media-buttons">
                            <img onclick="on_media_click(this)" class="playButton" src="/assets/icon/play.png">
                            <img onclick="on_media_click(this)" class="pauseButton" src="/assets/icon/pause.png">
                        </div>
                        <div class="audio-status-message">No Song Loaded</div>
                    </div>    

                </div>
            </div>
        `;
        var output_album = `
            <div class="upload_music_container"> 
                <h1 class="headerTest">Upload Album</h1>
                <div class="uploadAlbumContainer">   </div>
            </div>
        `;
        switch(type_){
            case "single":
                return output_single
            case "album":
                return output_album
        }
    },
    render: function(type_){
        // i. Get HTML Page
        var pageHTML = Uploads.markUp(type_);

        // iv. add Class to rootElement to add GridTemplate
        $(".root").addClass("uploads");
        
        return $(".root").html( pageHTML)
    },
    uploadSingle: function(e){

        // Route to Uploads Page
        RouterObject.Router("Upload Music", "single");

        // Render Upload Single Widget
        var upload_widget = Uploads.uploadWidget(e);
        $(".uploadPageContainer").append( upload_widget );

    },
    uploadAlbum: function(e){
        // Route to Uploads Page
        RouterObject.Router("Upload Music", "album");

        // Render Album_details widget
        var album_details_widget = Uploads.album_details();
        $(".uploadAlbumContainer").append( album_details_widget );
    },
    uploadWidget: function(uploadType){
        var markUp = `
            <div class="uploadWidget">
                <h1 class="headerTestUpload">`+uploadType+`</h1>
                
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>

                <div class="inputContainer">  
                    <input onkeyup="form_listener_change()" class="upload_field songTitle upld_fld " placeholder="Song Title"  value="Akiliz">
                    <input onkeyup="form_listener_change()" class="upload_field artists upld_fld" placeholder="Contributing Artist"  value="Ammara Brown">
                    <input onkeyup="form_listener_change()" class="upload_field year_created" placeholder="Year song Created"  value="2017">
                    <input onkeyup="form_listener_change()" class="upload_field producers" placeholder="Producers"  value="PTK">
                    <div class="choose_cont">
                            <input onchange="form_listener_change()" type="file" class="upload_field_file artwork" placeholder="Song Artwork">
                            <div class="browseSongButton">Upload Artwork</div>
                    </div>
                    <div class="choose_cont">
                            <input onchange="form_listener_change()" type="file" class="upload_field_file songFile" placeholder="Add Song">
                            <div class="browseSongButton">Upload Song</div>
                    </div>
                    
                </div>

                <div class="success_upload_song"></div>

                <div class="buttonContainer">
                    <div class="cancel_Upload ripple"> Cancel</div>
                    <div class="submit_Upload ripple" onclick="upload_Song()">Upload Song</div>
                </div>
            </div>
        `;
        return markUp
    },
    previewWidget: function(songTitle_, artistName_, producer_, year_){
        var markup = `
            <img onchange="" class="test_image" src=null>
            <audio class="song_player" src=null></audio>
            <div class="prevMeta">
                <div class="prevSongTitle"><span class="labelprev">Title:</span><div class="prevValue"> `+songTitle_+`</div></div>
                <div class="prevArtist"><span class="labelprev">Artist: </span><div class="prevValue">`+artistName_+`</div></div>
                <div class="prevProducers"><span class="labelprev">Prod By: </span><div class="prevValue">`+producer_+`</div></div>
                <div class="prevSongYear"><span class="labelprev">Year: </span><div class="prevValue">`+year_+`</div></div>
            </div>
            <div class="audioPrevCont ripple2"> 
                <div class="media-buttons">
                    <img onclick="on_media_click(this)" class="playButton" src="/assets/icon/play.png">
                    <img onclick="on_media_click(this)" class="pauseButton" src="/assets/icon/pause.png">
                </div>
                <div class="audio-status-message">No Song Loaded</div>
            </div>
        `;
        return markup
    },
    read_image: function(image_file){
        
        // i. render image
        var reader = new FileReader();
        reader.onload = function(e) {   $(".test_image").attr('src', reader.result );   };
        reader.readAsDataURL(image_file);

        // ii. set onchange attribute
        $(".test_image").attr('onchange', "image_onchange()" );
    },
    read_audio: function(audio_file){
        // i. render image
        var reader = new FileReader();
        reader.onload = function(e) {   $(".song_player").attr('src', reader.result );  };
        reader.readAsDataURL(audio_file);
    },
    audio_play_pause: function(song_file){
        // a. read audio file
        Uploads.read_audio( song_file );
        // b. listen for song_load to DOM_element
        var audio_dom_listener = setInterval( function() {
            if( $(".song_player")[0].duration > 0 ){
                
                // i. kill listener
                clearInterval( audio_dom_listener);
                // ii. change status message
                $('.audio-status-message').text("Now Playing...")
                // iii. Play audio Song
                $(".song_player")[0].play();
            }
        },10)
    },
    // Remove Test values in HTML value
    album_details: function(){
        var output = `
        <div class="album_details_cont">
            <h1 class="AD_header">Album Information</h1>
            <div class="lineStyler">
                <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
            </div>
            <div class="formContainer">
                <input class="upload_field album_title upload_fieldmobile" placeholder="Album Title" value="Takunda Nhamo">
                <input class="upload_field constributing_artists upload_fieldmobile" placeholder="Contributing Artists" value="Seh Calaz">
                <input class="upload_field year upload_fieldmobile" placeholder="Year of Release" value="2018">
                <input class="upload_field producer upload_fieldmobile" placeholder="Album Producer" value="Gunhill Records">
                <div class="choose_cont">
                            <input onchange="form_listener_change()" type="file" class="upload_field_file album_artwork upload_fieldmobile" placeholder="Song Artwork">
                            <div class="browseSongButton">Upload Artwork</div>
                </div>
            </div>
            <div class="next_button" onclick="get_album_details()">Next</div>
        </div>
        `;
        return output
    },
    add_tracks_widget: function(){
        var output = `
            <div class="tracklist_builder_cont">
                <h1 class="add_to_tracklist">Add Song to TrackList</h1>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>
                <div class="tracklist_form">
                    <input class="upload_field song_title upload_fieldmobile" placeholder="Name of Song" >
                    <input class="upload_field contributing_artists upload_fieldmobile" placeholder="Contributing/Featuring Artists">
                    <input type="file" class="upload_field song_file upload_fieldmobile" placeholder="Song File"  required = "required">
                </div>
                <div class="add_song_button" onclick="new_song_to_tracklist_details()">Add to Tracklist</div>
            </div>
        `;
        return output
    },
    tracklist_preview_widget: function( album_title_, cont_artists_, year_released_, album_length){
        var output = `
        <div class="album_prev_container">
            <div class="previewHeader">
                <div class="preview_header">Album Preview</div>
                <div class="lineStyler">
                    <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                </div>
                <div class="album_meta_head">
                    <img class="album_prev_artwrk" src="">
                    <div class="prev_meta_details">
                        <h1 class="albumTitle_prv">`+album_title_+`</h1>
                        <p class="albumArtist_prv">`+cont_artists_+`</p>
                        <p class="year_prv">`+year_released_+`</p>
                        <p class="albumlength_prv">`+album_length+` Songs</p>
                    </div>
                </div>
                <div class="tracklist_legend">
                    <div>#</div>
                    <div>Song Title</div>
                    <div>Contributing Artists</div>
                </div>
                <div class="tracklist_prev">
                    
                </div>
            </div>
            <div class="button_Cont_prev" >
                <div class="edit_songs ripple" onclick="edit_songs()"> Edit Songs</div>
                <div class="upload_button ripple" onclick="album_save()"> Upload Album</div>
            </div>
        </div>
        `;
        return output
    },
    read_image_album: function(_artwork){
        // i. render image
        var reader = new FileReader();
        reader.onload = function(e) {  
             $(".album_prev_artwrk").attr('src', reader.result );   
            };
        reader.readAsDataURL(_artwork);
    },
    render_album_builder: function(album_data){
        // get data from Form_Object
        var title_ = album_data.album_title;    var artist_ = album_data.cont_artists;
        var year_ = album_data.year_released;   var artwork_ = album_data.artwork;
        var album_length = $().length;
        
        // Get markUp for widgets
        var add_tracks_widget = Uploads.add_tracks_widget();
        var album_preview_pane = Uploads.tracklist_preview_widget( title_, artist_, year_, album_length);

        // render widgets to DOM
        $(".upload_music_container").append( add_tracks_widget);
        $(".upload_music_container").append( album_preview_pane);

        // render artwork to preview_pane
        Uploads.read_image_album( artwork_ );

        // instantiate listener for tracklist_added
        Uploads.tracklist_view()
    },
    tracklist_view: function(){

        // instatiate listener
        var tracklist_listener = setInterval( function(){

            var tracklist = State.uploads.album.tracklist;
            var tracklistCount = State.uploads.album.tracklistCount;

            if( tracklist.length != tracklistCount){
                
                // a. Kill event listener
                clearInterval( tracklist_listener );
                // b. increment tracklist count
                Uploads.render_tracklist_tracks()
                State.uploads.album.tracklistCount = tracklistCount + 1;
                // c. reset listener
                Uploads.tracklist_view()

                return console.log(State.uploads.album.tracklist)
            }
        },10)
    },
    track_markup: function( songTitle_, artist_, index_){
        var output = `
            <div class="trackContainer ripple">
                <div class="songIndex">`+(index_+1)+`.</div>
                <div class="songtitle">`+songTitle_+`</div>
                <div class="songartist">`+artist_+`</div>
            </div>
        `;
        return output
    },
    render_tracklist_tracks: function(){
        // delete old tracklist
        $(".tracklist_prev").html("")
        // get data array
        var tracklist = State.uploads.album.tracklist;

        // Map thru tracklist array and render
        tracklist.map( function(item, index){
            var markup = Uploads.track_markup(  item.songTitle, item.artist, index  );
            return $(".tracklist_prev").append( markup)
        })
    },
    // song edit markUP
    edit_song_widget: function(){
        var output = `
            <div class="outer_edit_song_contmob">
                <div class="edit_pane">
                    <h1 class="edit_pane_header">Edit Song</h1>
                    <div class="lineStyler lineStylermobile">
                        <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                    </div>
                    <div class="editpn_form_fields">
                        <div class="song_index">1</div>
                        <input class="upload_field song_title_edit upload_fieldmobile" placeholder="Name of Song" >
                        <input class="upload_field contributing_artists_edit upload_fieldmobile" placeholder="Contributing/Featuring Artists">
                        <input type="file" class="upload_field song_file_edit upload_fieldmobile" placeholder="Song File"  required = "required">
                    </div>
                    <div class="edt_pane_btn_cnt">
                        <div class="add_song_button_save" onclick="save_song_edit()">Save Edit</div>
                        <div class="add_song_button_cancel" onclick="close_edit_pane()">Cancel</div>
                    </div>
                </div>
                <div class="instruction_edit_song">Please Select the song you want to edit and it will appear inside the form!!</div>
            </div>
        `;
        return output
    },
    // rendr edit_pane_widget
    render_edit_pane: function(){
        var edit_widget = Uploads.edit_song_widget();
        return $(".upload_music_container").append( edit_widget);
    },
    add_event_listener_on_edit: function(){
        // i. get edit pne state
        var state = State.uploads.editState;
        // ii. switch statement based on state
        switch(state){
            case true:
                return add_edit_onclick()
            case false:
                return remove_edit_onclick()
        } 
    },
    // update tracklist with new edited data
    updateTracklist: function(song_title, artists, song_file, index){
        
        // change song in State.tracklist
        State.uploads.album.tracklist[    index   ].songTitle = song_title;
        State.uploads.album.tracklist[    index   ].artist = artists;
        State.uploads.album.tracklist[    index   ].songFile = song_file;

        // re-render tracklist_pane
        Uploads.render_tracklist_tracks();
    },
    form_listener_change: function(){
        // a. Get Data from form
        var songTitle = $(".songTitle").val();              var contributingArtists = $(".artists").val();
        var songFile = $(".songFile")[0].files[0];          var producer = $(".producers").val();
        var year = $(".year_created").val();                var song_artwork = $(".artwork")[0].files[0];

        // b. render metadata
        $(".prevSongTitle").find(".prevValue").text(songTitle);
        $(".prevArtist").find(".prevValue").text(contributingArtists);
        $(".prevProducers").find(".prevValue").text(producer);
        $(".prevSongYear").find(".prevValue").text(year);

        // c. render image into view
        if(  song_artwork  != undefined ) {
            Uploads.read_image( song_artwork );
            $(".test_image").css({
                "opacity":"1"
            });
        }else{
            $(".test_image").css({
                "opacity":"0", "display":"inline"
            });
        }
    },
    upload_Song: function(){
        // a. Get Data from form
        var songTitle = $(".songTitle").val();              var contributingArtists = $(".artists").val();
        var songFile = $(".songFile")[0].files[0];          var producer = $(".producers").val();
        var year = $(".year_created").val();                var song_artwork = $(".artwork")[0].files[0];

        // c. Ensure user confirms the upload
        var confirm_upload = confirm("Press Ok to Complete Upload!");
        // d. if User clicks OK to complete upload
        if(confirm_upload == true){
            // Push song object to storage
            var file_songTitle = songFile.name;
            
            // Render Progress Bar
            Uploads.render_song_progress(songTitle, "song");
            
            // Create a root reference
            var storageRef = firebase_storage.storage().ref().child(`songsAll/`+file_songTitle +``);
            
            // Upload artwork
            var upload_artwork = function(){
                var storageRef = firebase_storage.storage().ref().child(`songArtwork/`+ song_artwork.name +``);
                return storageRef.put( song_artwork )
            }
            // Success and Error call backs
            var push_song_to_DB = function( ){
                // Get date in milliseconds
                var date = new Date().getTime();
                // Define song objhect
                var song_object = {
                    artist: contributingArtists,
                    iframe: songFile.name,
                    image: song_artwork.name,
                    songTitle: songTitle,
                    streamCount: 0,
                    timeStamp: date
                }
                // Push to DB
                firebase.database().ref("songs").push(song_object)
            }
            var success = function(){
                // remove widget
                $(".progress_widget_cont").remove();

                // prompt user => successful upload
                $(".success_upload_song").text("Song Uploaded Successfully");
                setTimeout(function(){    $(".success_upload_song").text("")  },3500);

                // clear fields
                Uploads.reset_input_fields();

                // delete ref for testing recursion
                storageRef.delete().then(function() {

                })
                // push to firebaseDatabase
                return push_song_to_DB(), upload_artwork(),
                    // d. Push activity to State
                    State.addActivity("song_upload", songTitle)
            }
            var error = function(){
                return console.log("Error")
            }
            
            // Push file to Storage
            storageRef.put(songFile).on('state_changed', function(snap){
                var progress =  Math.ceil( (snap.bytesTransferred / snap.totalBytes)*100 ) + "%";
                // Update progress bar
                $(".inner_prgrss_bar").css("width",progress);
                $(".inner_prgrss_percent").text(progress)

            },
            error, success)
        }

    },
    // MarkUp for song widget
    upload_status_widget: function(songName_, type_, countString){
        var output = `
            <div class="progress_widget_cont">
                <div class="progress_widget">
                    <div class="progress_hrd">Upload Progress</div>
                    <div class="prgrss_meta">
                        <div class="songname_prgrss">Uploading Song: `+songName_+`</div>
                        <div class="count_tally">Tally: 1/1</div>
                    </div>
                    <div class="progressBarCont">
                        <div class="moving_bar">
                            <div class="inner_prgrss_bar"></div>
                        </div>
                        <div class="inner_prgrss_percent">0%</div>
                    </div>            
                </div>
            </div>
        `;
        var album = `
        <div class="progress_widget_cont">
            <div class="progress_widget">
                <div class="progress_hrd">Upload Progress</div>
                <div class="prgrss_meta">
                    <div class="songname_prgrss">Uploading Song: `+songName_+`</div>
                    <div class="count_tally">Tally:`+countString+`</div>
                </div>
                <div class="progressBarCont">
                    <div class="moving_bar">
                        <div class="inner_prgrss_bar"></div>
                    </div>
                    <div class="inner_prgrss_percent">0%</div>
                </div>            
            </div>
        </div>
        `;
        switch (type_) {
            case "song":
                return output
            case "album":
                return album
        }
        return output
    },
    // Render song progress widget
    render_song_progress: function(songName_, type_, countString){
        var markup = Uploads.upload_status_widget(songName_, type_,  countString);
        // render to DOM
        $(".root").append(markup)
    },
    reset_input_fields: function(){
        var reset = function(){
            return $(".test_image").css("display", "none"),
            $(".test_image").attr("src", null),
            $(".prevValue").text(""),
            $("input").val("")
        }
        return reset()
    },
    mobileSelectUploadType: function(){
        // Get selection markup
        var markup = this.selectUploadtypeMarkUp();
        // Append to DOM
        return $(".root").html(markup)
    },
    selectUploadtypeMarkUp: function(){
        var options = quickUploadWidget.markUp();
        var output = `
            <div class="select_upload_type_container">
                <h1 class="uploadTypeHeader">Select Upload Type</h1>
                <div class="select_holder_type">${options}</div>
            </div>
        `;
        return output
    }
}


// render new image on change
window.image_onchange = function(){
    var image_ = $(".artwork")[0].files[0];
        return Uploads.read_image(image_)
}
// play onclick handler
window.on_media_click = function() {

    // a. Check if song playing the End
    if( $(".song_player")[0].duration > 0 &&  $(".song_player")[0].paused == false){
        
        // // a. Stop Song
        $('.audio-status-message').html("");
        $(".song_player")[0].pause();
        $(".song_player").attr("src", "");
        
        // b. change message
        $('.audio-status-message').append("Song Stopped...");
        $(".playButton").toggle();
        $(".pauseButton").toggle();

        // c. re-correct message
        setTimeout( function() {
            $('.audio-status-message').text("No Song Loaded");
        },1500)
    }
    // b. Proceed to load new song to DOM & play
    else{
        var song_file =  $(".songFile")[0].files[0];
        switch( song_file){
            case undefined:
                return alert( "No song Loaded")
            default:
                // a. toggle buttons
                $(".playButton").toggle();
                $(".pauseButton").toggle();
    
                return Uploads.audio_play_pause(song_file)
        }
    }
}
// get album_details on NEXT_Click
window.get_album_details = function() {

    // Collect form data
    var album_title = $(".album_title").val();          var cont_artists = $(".constributing_artists").val(); 
    var year_released = $(".year").val();               var producer = $(".producer").val();
    var artwork = $(".album_artwork")[0].files[0];

    // add album data tp State
    var album_data = { album_title, cont_artists, year_released, artwork, producer };
    State.uploads.album = {
                album_data,
                tracklist:[],
                tracklistCount:0
    }

    // remove album_details_widget
    $(".uploadAlbumContainer").remove();

    // Call method to render_widgets
    return Uploads.render_album_builder( album_data );
}
// get song_details form Add_Song_to_tracklist_Widget
window.new_song_to_tracklist_details = function() {

    var song_title = $(".song_title").val();
    var artists = $(".contributing_artists").val();
    var song_file = $(".song_file")[0].files[0];

    // Check if values not undefined
    if(  song_title != "" && artists != ""  &&  song_file != undefined  &&  song_file.type == "audio/mp3" ){
        // add track StateObject
       State.uploads.album.tracklist.push({     songTitle: song_title, artist: artists, songFile: song_file     });
    }
    // else alert user with error
    else{
        (  song_title == "")  ?  outline_changer(".song_title") : null ;
        (  artists == "")  ?  outline_changer(".contributing_artists") : null ;
        (  song_file == undefined )  ?  outline_changer(".song_file") :  null ;
        (  song_file.type != "audio/mp3" )  ?  song_format_error() :  null ;
        
    }

    
}
// field outline color changer if form field empty
window.outline_changer = function(class_, color, time_){
    
    var colr_ = (color == undefined) ? "#791f30": color;
    var time_ms = ( time_ == undefined) ? 3500 : time_;

    // change color to alert red
    $(class_).css({ "border": `solid 1px `+colr_+``, "background":"#2f2a2c" });
    
    // Change color to default grey
    setTimeout(function(){
        $(class_).css({ "border": "", "background":"" });
    }, time_);
};
// song uploaded wrong format
window.song_format_error = function(){
    
    // alert user of error
    alert( "The song you want to upload is not an mp3 file, please ensure it is an mp3 format!" );

    // outline field with error
    outline_changer( ".song_file", undefined, 5000);
}
// edit songs in album preview pane
window.edit_songs = function(){
    if( $(".upload_music_container").find(".edit_pane").length == 1){
       
    }
    else if( $(".upload_music_container").find(".edit_pane").length == 0 ){
        Uploads.render_edit_pane();
        State.uploads.editState = !State.uploads.editState;
        change_border_color();
        Uploads.add_event_listener_on_edit();
    }
}
window.save_song_edit = function(){
    // a. update tracklist with new data
    var song_title = $(".song_title_edit").val();           var artists = $(".contributing_artists_edit").val();
    var song_file = $(".song_file_edit")[0].files[0];            var index = (parseInt( $(".song_index").text())  - 1);
    
    // b. close the widget
    if( song_title != "" || artists != "" || song_file != undefined ){
        Uploads.updateTracklist(song_title, artists, song_file, index);
        close_edit_widget();
    }
    else{
        alert("Please fill in all fields before proceeding!")
    }
}
window.close_edit_pane = function(){
    return close_edit_widget()
}
// chane border of preview pane
window.change_border_color = function(){
    var state = State.uploads.editState;

    switch(state){
        case true:
            return $(".tracklist_prev").css( {"border":"solid 2px #651222", "border-bottom":"none"});
        case false:
            return $(".tracklist_prev").css( {"border":"solid 1px #292727", "border-bottom":""});
    }

}
// remove edit widget from DOM
window.close_edit_widget = function(){
    // remove pane
    $(".edit_pane").remove();
    $(".outer_edit_song_contmob").remove();
    // change state in Store
    State.uploads.editState = !State.uploads.editState;
    // change border color to normal grey
    change_border_color();
}
// add edit listener to onclick attr
window.add_edit_onclick = function(){
    var t = $(".trackContainer");
    var object_length = t.length;
    var data = Object.values(t);
    data.length = object_length;
    
    for( var i=0; i<data.length; i++){
        var event_listener = "get_song(this)";
        $($(".trackContainer")[i]).attr("onclick", event_listener);
    }
}
// remove edit listener to onclick attr
window.remove_edit_onclick = function(){
    var t = $(".trackContainer");
    var object_length = t.length;
    var data = Object.values(t);
    data.length = object_length;

    for( var i=0; i<data.length; i++){
        var event_listener = "play_song(this)";
        $($(".trackContainer")[i]).attr("onclick", event_listener);
    }
}
// get song details on click_edit
window.get_song = function(param){
    // i. get values from clicked item
    var songName = $(param).find(".songtitle").text();
    var artist = $(param).find(".songartist").text();
    var index = $(param).find(".songIndex").text();
    index = parseInt(  index.substr( 0, (index.length - 1))  );
    
    // ii. load song into into edit_widget_pane
    $(".song_title_edit").val( songName );
    $(".contributing_artists_edit").val( artist );
    $(".song_index").text( index );

}
// listen for changes on form
window.form_listener_change = function(){
    return Uploads.form_listener_change()
}
// upload song
window.upload_Song = function(){
    var count = 0;

    // validate all fields entered
    var length = $("input").length;

    // Get all input fields
    var all_fields = Object.values($("input"));

    // Correct length of object
    all_fields.length = length;

    // Map thru fields and check if empty
    all_fields.map( function(field, index){
        if( $(field).val() != ""){
            // alert("Please make sure all fields are filled!")
            count++;
            if(index == (length-1) && count == length){
                return Uploads.upload_Song();
            }
            
        }
        else if(index == (length-1) && count != length){
                alert("Please make sure all fields are filled!")
            }
    })
    
}
// save album
window.album_save = function(){

    // Get alubm State
    var album_data = State.uploads.album.album_data;
    var album = State.uploads.album;
    var tracklist = album.tracklist;
    var songObjects = [];
    
    // Album object
    var album_meta = {
        Artist: album_data.cont_artists,
        Producer: album_data.producer,
        Tracklist: [],
        albumArtwork: album_data.artwork.name,
        albumTitle: album_data.album_title,
        releaseDate: album_data.year_released
    }

    // Upload Album
    tracklist.map( function(track){
        // Date
        var date = new Date().getTime();
        // Song Object
        var song_ = {
            artist: track.artist,
            iframe: track.songFile.name,
            image: album_data.artwork.name,
            songTitle: track.songTitle,
            streamCount: 0,
            timeStamp: date
        }
        var k = {songObject: song_, file: track.songFile};
        // Push song to songObjects 
        songObjects.push(k);
        return album_meta.Tracklist.push(track.songTitle)
    });
    
    // Push to Storage day
    var push_to_storage = function( songObject, countString_){

        // On Success
        var success = function(){
            // Close progress widget
            $(".progress_widget_cont").remove();
            
            // Push album
            var pushToDB = function(){
                firebase.database().ref("songs").push(songObject.songObject)
            }

            return pushToDB()
        };

        // On Error
        var error = function(){};

        // Storage link
        var storageRef = firebase_storage.storage().ref().child(`songsAll/`+songObject.songObject.iframe +``);
        
        // render progress widget
        Uploads.render_song_progress( songObject.songObject.songTitle, "album", countString_);

        // Push file to Storage
        storageRef.put(songObject.file).on('state_changed', function(snap){
            // get progress percentage
            var progress =  Math.ceil( (snap.bytesTransferred / snap.totalBytes)*100 ) + "%";
            // Update progress bar
            $(".inner_prgrss_bar").css("width",progress);
            $(".inner_prgrss_percent").text(progress);
        },
        error, success);
    };

    // Map thru songObjects tracklist array & form song objects 
    var create_songObject = function(){
        // Map thru Array
        songObjects.map(function(song, index){
            // Create Tally String
            var countString = index + "/" + songObjects.length;
            return push_to_storage(song, countString);
        })

    }

    // Get Length of tracklist
    var trackLength = album_meta.Tracklist.length;
    
    // Listen for tracklist loaded
    var setlistener = setInterval(function() {
        if( trackLength == tracklist.length ){

            // Clear interval
            clearInterval(setlistener);

            // Push Album to DB
            firebase.database().ref("albums").push(album_meta);
            
            // Upload artwork
            var storageRef = firebase_storage.storage().ref().child(`songArtwork/`+album_meta.albumArtwork +``);
            storageRef.put( album_data.artwork ).on('state_changed', function(snap){
                return alert("Album Upload Completed!")
            })

            // d. Push activity to State
            State.addActivity("album_upload", album_meta.albumTitle)

            // Create song object
            create_songObject();
        }
    }, 10);
}

window.Uploads = Uploads;