

var MyAccount = {
    markUp: function(){
        var output = `<div class="my_account_main"> </div>`;
        return output
    },
    render: function(){
        // i. get artist data
        var artist_data = State.user;
        // ii. Get HTML Page
        var pageHTML = MyAccount.markUp();
        var image_src = State.profilePic;
        var header_main = MyAccount.headerContainer( image_src );
        var meta_header = MyAccount.meta_header( artist_data.artistName );
        var widgetContainer = MyAccount.widgetContainer();

        // Get Data for home Tab
        var bio = MyAccount.biography_data();
        var personal_details = MyAccount.personal_data();
        var contact_details = MyAccount.account_data();

        var homeTab = MyAccount.homeTab( bio, personal_details, contact_details );

        // iii. render html to DOM
        var renderAll = function(){
            $(".root").html( pageHTML);
            $(".my_account_main").append( header_main);
            $(".my_account_main").append( widgetContainer);
            $(".artist_meta_nav_container").html( meta_header);
            $(".widgetContainer").html( homeTab );
        }

        return renderAll()
    },
    headerContainer: function(image_src){
        var output = `
            <div class="hdr_container_prof">
                <div class="profile_image ripple"  onclick="clickk()"> 
                    <img src="`+image_src+`" class="profile-image-item">
                    <div class="profile_change-icon" >
                        <img class="change_icon_img" src="/assets/icon/camera.png" >
                        <input type="file" class="get_profile_pic" onchange="get_image()">
                    </div>
                </div>
                <div class="artist_meta_nav_container"> </div>
            </div>
        `;
        return output
    },
    meta_header: function(artist_name){
        var output = `
            <div class="meta-header">
                <div class="artist-name-supportBTN">
                    <div class="artist_name_prof">`+artist_name+`</div>
                    <div class="spport_button_cont">
                        <div class="contact_support_btn" onclick="openContactSupport()">Contact Support</div>
                    </div>
                </div>
                <div class="header-nav-prof">
                    <div class="nav-item-profile home_prof" onclick="home()">Home</div>
                    <div class="nav-item-profile inbox_prof" onclick="click_inbox()">Inbox</div>
                    <!-- <div class="nav-item-profile settings_prof">Settings</div> -->
                </div>
            </div>
        `;
        return output
    },
    homeTab: function( biography_data, personal_data, account_data ){
        var output = `
            <div class="homeContainer">
                <div class="bio">
                    <div class="widget_header">Biography</div>
                    <div class="pd_data biography">`+biography_data+` </div>
                    <div class="pdetails_button ripple" onclick="edit_bio()">Edit</div>
                </div>
                <div class="personal_details">
                    <div class="widget_header">Personal Details</div>
                    <div class="pd_data personal"> `+personal_data+` </div>
                    <div class="pdetails_button ripple" onclick="editPersonalDetails()">Edit</div>
                </div>
                <div class="contact_details">
                    <div class="widget_header">Account Details</div>
                    <div class="pd_data contact_det"> `+account_data+` </div>
                    <div class="pdetails_button ripple" onclick="editContactDetails()">Edit</div>
                </div>
            </div>
        `;
        return output
    },
    widgetContainer: function(){
        var output = `
            <div class="widgetContainer"></div>
        `;
        return output
    },
    biography_data: function(){
        var biograhpy = State.user.data.biography;
        return biograhpy
    },
    account_data: function(){
        var address = State.user.address;
        var account = State.user.accountDetails;
        var password = function(){
            var passwrd = account.password;
            var password = password
        }
        var output = `
            <div class="data-cont-prof">
                <div class="data-item-prof username_prof">Username<div class="value-prof">`+account.username+`</div>    </div>
                <div class="data-item-prof email_prof">Email<div class="value-prof">`+account.email+`</div>    </div>
                <div class="data-item-prof phone_prof">Cell Phone #<div class="value-prof">`+account.phoneNumber+`</div>    </div>
                <div class="data-item-prof passwrd_prof">Password<div class="value-prof">**********</div>    </div>
                <div class="data-item-prof country_prof">Country<div class="value-prof">`+address.country+`</div>    </div>
                <div class="data-item-prof city_prof">City<div class="value-prof">`+address.city+`</div>    </div>
                <div class="data-item-prof address_prof">Street Address<div class="value-prof">`+address.streetAddress+`</div>    </div>
            </div>
        `;
        return output
    },
    personal_data: function(){
        var personal_data = State.user;
        var dateOfBirth = new Date(personal_data.dateOfBirth).toDateString();
        var date_registered = new Date(personal_data.dateRegistered).toDateString();
        var output = `
            <div class="data-cont-prof">
                <div class="data-item-prof firstName_prof">First Name <div class="value-prof">`+personal_data.firstName+`</div>    </div>
                <div class="data-item-prof lastName_prof">Last Name <div class="value-prof">`+personal_data.lastName+`</div>    </div>
                <div class="data-item-prof artistName_prof">Artist Name<div class="value-prof">`+personal_data.artistName+`</div>    </div>
                <div class="data-item-prof dob_prof">Date of Birth<div class="value-prof">`+dateOfBirth+`</div>    </div>
                <div class="data-item-prof registered_prof">Date Registered<div class="value-prof">`+date_registered+`</div>    </div>
            </div>
        `;
        return output
    },
    edit_bio: function(){
        // i. get bio data
        var bio = MyAccount.biography_data();
        var editContainer = MyAccount.editDataCont("Edit Biography");
        var output = `<textarea class="bio_field"></textarea><div onclick="save_bio()" class="editDataSavebbtn upload_button ripple" style=" position: absolute;">Save</div>`;

        // ii. append data to DOM
        $(".root").append(editContainer);
        $(".edit-data-prof-widget").append(output);
        $(".bio_field").html(bio)
    },
    editPersonalDetails: function(){
        // i. get bio data
        var user =  State.user;
        var editContainer = MyAccount.editDataCont("Edit Personal Details");
        var output = `
            <div class="editPDfields">
                <div class="data-item-edit firstName_prof">First Name<input class="firstName_edit_pd upload_field " value="`+user.firstName+`"> </div>
                <div class="data-item-edit lastName_prof">Last Name <input class="lastName_edit_pd upload_field " value="`+user.lastName+`"> </div>
                <div class="data-item-edit  artistName_prof">Artist Name<input class="artistName_edit_pd upload_field " value="`+user.artistName+`"> </div>
            </div>
            <div onclick="save_personal()" class="editDataSavebbtn upload_button ripple" style=" position: absolute;">Save</div>
            `;

        // ii. append data to DOM
        $(".root").append(editContainer);
        $(".edit-data-prof-widget").append(output);
     
    },
    editContactDetails: function(){
        // i. get bio data
        var user =  State.user;
        var editContainer = MyAccount.editDataCont("Edit Personal Details");
        var output = `
            <div class="editPDfields">
                <div class="data-item-edit userName_prof"><div class="edt_lbl_mb_">Username</div><input class="username_edit_pd upload_field " value="`+user.accountDetails.username+`"> </div>
                <div class="data-item-edit email_prof"><div class="edt_lbl_mb_">Email</div><input class="email_edit_pd upload_field " value="`+user.accountDetails.email+`"> </div>
                <div class="data-item-edit password_prof"><div class="edt_lbl_mb_">Password</div><input class="password_edit_pd upload_field " value="`+user.accountDetails.password+`"> </div>
                <div class="data-item-edit  address_prof"><div class="edt_lbl_mb_">Address</div><input class="streetAdress_edit_pd upload_field " value="`+user.address.streetAddress+`"> </div>
                <div class="data-item-edit  city_prof"><div class="edt_lbl_mb_">City</div><input class="city_edit_pd upload_field " value="`+user.address.city+`"> </div>
                <div class="data-item-edit  cellphone_prof"><div class="edt_lbl_mb_">Cellphone</div><input class="cellphone_edit_pd upload_field " value="`+user.accountDetails.phoneNumber+`"> </div>
            </div>
            <div onclick="save_contact()" class="editDataSavebbtn upload_button ripple" style=" position: absolute;">Save</div>
            `;

        // ii. append data to DOM
        $(".root").append(editContainer);
        $(".edit-data-prof-widget").append(output);
    },
    editDataCont: function(header){
        var output = `
            <div class="editDataCont">
                <div class="edit-data-prof-widget">
                    <h1 class="editDataContHeader">`+header+`</h1>
                    <div class="lineStyler">
                        <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                    </div>
                </div>
                <div class="close_support_widget ripple" onclick="closeEdits()">Close</div>
            </div>
        `;
        return output
    },
    editRender: function(){
        var edit_container = MyAccount.editDataCont();
    },
    inbox_markup: function(){
        var output = `
            <div class="inbox-container">
                <div class="messageBox">
                    <div class="msg-header">Messages</div>
                    <div class="msg-container"></div>
                </div>
                <div class="chatContainer">
                <div class="no-chat-open">No Chat Open</div>
                </div>
            </div>
        `;

        var mobile = `
            <div class="inbox-container">
                    <div class="messageBox">
                        <div class="msg-header">Messages</div>
                        <div class="msg-container"></div>
                    </div>
            </div>
        `;

        return (  $(".navigation").css("display") != "none"  ) ? output : mobile
    },
    mobile_chat_click: function(){

    },
    render_inbox: function(){
        var inbox_container = MyAccount.inbox_markup();
        var chats = State.user.inbox;
            return $(".widgetContainer").html( inbox_container ), MyAccount.renderChats( chats )
    },
    home: function(){
        // Get Data for home Tab
        var bio = MyAccount.biography_data();
        var personal_details = MyAccount.personal_data();
        var contact_details = MyAccount.account_data();

        var homeTab = MyAccount.homeTab( bio, personal_details, contact_details );
            return $(".widgetContainer").html( homeTab )
    },
    render_home: function(){
        var biography_data = MyAccount.biography_data();
        var personal_data = MyAccount.personal_data();
        var account_data = MyAccount.account_data();
        var home_tab = MyAccount.homeTab( biography_data, personal_data, account_data  );
            return $(".widgetContainer").html( home_tab )
    },
    chats: function(date_, subject){
        var date = new Date(date_).toDateString();
        var output = `
            <div class="chat-object ripple" onclick="openChat(this)">
                <div class="chat-date">`+date+`</div>
                <div class="chat-subject-title">`+subject+`</div>
            </div>
        `;


        var mobile = `
            <div class="chat-object ripple" onclick="openChat_mobile(this)">
                <div class="chat-date">`+date+`</div>
                <div class="chat-subject-title">`+subject+`</div>
            </div>
        `;
        
        return ( $(".navigation").css("display") != "none" ) ? output : mobile
    },
    renderChats: function(chats_){
        chats_.map( function(chat){
            var chat_markup = MyAccount.chats( chat.date, chat.subject);
            return $(".msg-container").append(chat_markup)
        })
    },
    chat: function(subject){
        var old_subject = subject;

        if(subject.length >= 5 ){
            var new_subjct = subject.split(" ");
            new_subjct.length = 5;
            new_subjct = new_subjct.join(" ")  + "...";
        }

        subject = ( $(document)[0].body.clientWidth < 600)? new_subjct : subject;

        var output = `
            <div class="opened-chat" >
                <div class="chat-header" data-content="`+old_subject+`">`+subject+`</div>
                <div class="chat-messages"></div>
                <div class="text-entry-container">
                    <textarea class="text_chat_field" placeholder="Type message here..."></textarea>
                    <div class="send-message ripple" onclick="sendMessage()">Send</div>
                </div>
            </div>
        `;
        return output
    },
    renderChatMessages: function(subject){
        // get all chats
        var chats = State.user.inbox;
        // map thru chats to find subject match
        chats.map( function(chat){
            if( chat.subject == subject){
                var chat_markup = MyAccount.chat(subject);
                    return $(".chatContainer").html( chat_markup ), MyAccount.loopMessages( chat.messages )
            }
        })
    },
    mobile_renderChatMessages: function(subject){
        // Get chat Container
        var open_chat_container = `<div class="chatContainer"></div>`;
        
        // get all chats
        var chats = State.user.inbox;
        
        // Append Container to DOM
        $(".inbox-container").html(open_chat_container);

        // map thru chats to find subject match
        chats.map( function(chat){
            if( chat.subject == subject){
                var chat_markup = MyAccount.chat(subject);
                    return $(".chatContainer").html( chat_markup ), MyAccount.loopMessages( chat.messages ), MyAccount.scroll_page();
            }
        })

    },
    loopMessages: function(messagesArray){
        // sort array by and ensure only proceeds when done sorting
        var newpromise = new Promise( function(res,rej){
            var sorted_Array = messagesArray.sort( function(a,b){return a.message_id - b.message_id});
            var checker = setInterval(function() {
                if( sorted_Array.length == messagesArray.length){
                    clearInterval( checker );
                    res(sorted_Array)
                }
            }, 10);
        })
        // map thru all messages and append to chat box
        .then(function(sorted_Array){
            sorted_Array.map( function(message){
                var messageMarkUp = MyAccount.messageMarkUp( message.sender, message.message);
                    return $(".chat-messages").append(messageMarkUp);
            })
        })
    },
    messageMarkUp: function(sender, message){
        switch(sender){
            case "Me":
                var output = `
                <div class="messsage-object sender-me">
                <div class="message-sender">`+sender+`</div><p class="act-message">`+message+`</p> </div>`;
                    return output
            case "Support":
                var output = `
                <div class="messsage-object sender-suppport">
                <div class="message-sender">`+sender+`</div><p class="act-message">`+message+`</p></div>`;
                    return output
        }
    },
    sendMessage: function(){
        // get value from field
        var subject = $(".chat-header").attr("data-content");
        var data = $(".text_chat_field")[0].value;

       if(data.length > 0 ){
        // loop thru chats, get chat and add message
        var chats = State.user.inbox;
        chats.map( function(chat, index){
            if( chat.subject == subject){
                // define message id
                var new_count = State.user.inbox[index].messages.length;
                // push new message to state
                State.user.inbox[index].messages.push({ message_id:new_count, sender:"Me", message: data });
                // re-render messages
                MyAccount.renderChatMessages( subject );
                MyAccount.scroll_page();
            }
        })
       }
       else if(data.length == 0){
           return alert("No Message typed!")
       }

    },
    scroll_page: function(){
        $('.chat-messages').stop().animate({
            scrollTop: $('.chat-messages')[0].scrollHeight
          }, 600);
    },
    contactSupportWidget: function(){
        var output = `
            <div class="con_supp_container">
                <div class="contact-support">
                    <h1 class="editDataContHeader">Contact Support</h1>
                    <div class="lineStyler">
                        <div class="L_one"></div><div class="L_two"></div><div class="L_three"></div>
                    </div>
                    <div class="field-contact-support">
                        <input class="message-subject-support " placeholder="Enter reason for contacting Support">
                        <textarea class="textarea-contact-support" placeholder="Type enquiry here..."></textarea>
                    </div>
                    <div class="sendMessage-contactSupport ripple" style="position: absolute;" onclick="sendMessageSupport()">Send Message</div>
                </div>
                <div class="close_support_widget ripple" onclick="closeWidgetSupport()">Close</div>
            </div>
        `;
        return output
    },
    renderSupportWidget: function(){
        var output = MyAccount.contactSupportWidget();
            return $(".root").append(output);
    },
    contactSupportSendMessage: function(){
        // get values from DOM
        var subject = $(".message-subject-support ").val();
        var message = $(".textarea-contact-support")[0].value;

        // success & failure methods
        var alert_message = function(){alert("Please ensure all fields filled!")};
        var success = function(){ State.contactSupport(subject, message); $(".con_supp_container").remove() };
         
        // send message to support buffer and chat buffer
        return (subject.length != 0 && message.length != 0) ? success() : alert_message()
    },
    save_contact: function(){
        
        // Get values
        var userName = $(".username_edit_pd").val();
        var email = $(".email_edit_pd").val();
        var password = $(".password_edit_pd").val();
        var streetAdress = $(".streetAdress_edit_pd").val();
        var city = $(".city_edit_pd").val();
        var phoneNumber = $(".cellphone_edit_pd").val();

        // Set new State
        State.user.accountDetails.username = userName;
        State.user.accountDetails.email = email;
        State.user.accountDetails.password = password;
        State.user.accountDetails.phoneNumber = phoneNumber;
        State.user.address.streetAddress = streetAdress;
        State.user.address.city = city;

        // Re-render home widget
        MyAccount.home();
        
        // Remove edit widget
        $(".editDataCont").remove();

        // Push activity to State
        State.addActivity("contact")
    },
    save_personal: function(){
        
        // Get values
        var firstName = $(".firstName_edit_pd").val();
        var lastName = $(".lastName_edit_pd").val();
        var artistName = $(".artistName_edit_pd").val();

        // Set new State
        State.user.firstName = firstName;
        State.user.lastName = lastName;
        State.user.artistName = artistName;

        // Re-render home widget
        MyAccount.home();
        
        // Remove edit widget
        $(".editDataCont").remove();

        // d. Push activity to State
        State.addActivity("personal");
    },
    save_bio: function(){

        // Add new data to state
        var new_bio_data =  $(".bio_field")[0].value;
        State.user.data.biography = new_bio_data;

        // Update data in bio widget
        var new_data  = State.user.data.biography;
        $(".biography").html( new_data );

        // Close edit widget and remove it from Dom
        $(".editDataCont").remove();

        // Push activity to State
        State.addActivity("bio")
    },
    change_profile_picture(){
        // Get image from DOM
        var picture = $(".get_profile_pic")[0].files[0];
        var type = picture.name.split('.').pop();
        var old_picture = State.user.profileImageUrl;
        var old_picture_type = old_picture.split('.').pop();

        // Upload to Storage function after delete success
        console.clear()
        var upload = async function(){
            await firebase_artists.storage().ref().child(`profileImages/${State.userKey}.${type}`).put(picture).then(function(){
                
                // Update User DB
                State.user.profileImageUrl = "no image";
                State.user.profileImageUrl = `${State.userKey}.${type}`;
                console.log("::Image Uploaded")
            }).catch(err=>console.log(`Upload Problem: ${err.message}`));
            return image_change()
        }
        
        // Change image src in DOM
        var image_change = async function(){
            return firebase_artists.storage().ref().child(`profileImages/${State.userKey}.${type}`).getDownloadURL().then(function(url) {
                $(".profile-image-item").attr("src", url);
                console.log("::Image Changed")
            }).catch(err=>console.log(`Source Problem: ${err.message}`))
        }

        var delete_ = async function(){
            await firebase_artists.storage().ref().child(`profileImages/${State.userKey}.${old_picture_type}`).delete().then(function(){
                console.log("::Image Delete")
                return
            }).catch(err=>console.log(`Delete Problem: ${err.message}`))
            
            return upload()
        }

        // Delete Current image from Storage
        ( old_picture != "default.png" )? delete_() : upload();
            
    }
}


// Oncclick handlers
window.edit_bio = function(){
    return MyAccount.edit_bio();
}
window.save_bio = function(){
    return MyAccount.save_bio()
}
window.save_personal = function(){
    return MyAccount.save_personal()
}
window.save_contact = function(){
    return MyAccount.save_contact()
}
window.click_inbox = function(){
    return MyAccount.render_inbox();
}
window.click_home = function(){
    return MyAccount.render_home();
}
window.openChat = function(param){
    var chat_state = $(param).hasClass("active-message");
    var subject_ = $(param).find(".chat-subject-title").text()
    
    switch(chat_state){
        case true:
            return 
        case false:
            $(".chat-object").removeClass("active-message");
            $(param).addClass("active-message");
            MyAccount.renderChatMessages(subject_)
                return MyAccount.scroll_page();
    }
}
// Mobile chat open
window.openChat_mobile = function(param){
    var subject_ = $(param).find(".chat-subject-title").text()
    
    return MyAccount.mobile_renderChatMessages(subject_)
}
window.home = function(){
    return MyAccount.home()
}
window.editPersonalDetails = function(){
    return MyAccount.editPersonalDetails()
}
window.editContactDetails = function(){
    return MyAccount.editContactDetails()
}
window.sendMessage = function(){
    return MyAccount.sendMessage()
}
window.openContactSupport = function(){
    MyAccount.renderSupportWidget();
}
window.sendMessageSupport = function(){
    return MyAccount.contactSupportSendMessage();
}
window.closeWidgetSupport = function(){
    return $(".con_supp_container").remove()
}
window.closeEdits = function(){
    return $(".editDataCont").remove()
}
window.clickk = function(){
    return $(".get_profile_pic")[0].click()
}
window.get_image = function(){
    return MyAccount.change_profile_picture() 
}

window.MyAccount = MyAccount