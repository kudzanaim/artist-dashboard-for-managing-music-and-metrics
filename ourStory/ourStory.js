var OurStory = {
    render: function(){
        var markup = this.markup();

        // Add Body Class & fix Nav
        $(".App").addClass("body_main_");
        $(".navmain").addClass("navFAQ")
        
        // Render to DOM
        return $(".root").html(markup)
    },
    markup: function(){
        var output = `
            <div class="ourStory_cont">
                <div class="story_content_">
                    <h1 class="story_hdr">Our Story</h1>
                    <p class="about_p">
                    Our pursuit is to ensure we liberate access for all lovers of Zimbabwean music whilst ensuring artists are compensated fairly 
                    along the journey. 
                    </p>


                    <h1 class="about_h">Music Listeners</h1>
                    <p class="about_p">
                    Accessing any song or artist you want at any time as a Zimbabwean, has thus far been challenge that many can attest to. 
                    As lovers of music ourselves, it is this problem and frustration that really called us to attempt fully solve this
                    issue and make music accessible for all, affordably and conviniently. Our aim is to ensure that music listeners can
                    access any song or artist, whenever they want without being hindered by problems associated with, access, cost or un-availability.
                    </p>
                    
                       
                    
                    <h1 class="about_h">Music Artists</h1>
                    <p class="about_p">
                    Without artists, there can be no music. At Strma it is our goal offer a platform that allows artists to exhibit their 
                    creations to the world, attain awareness for their talent, and earn a fair wage through the process. We continuosly
                    improving our platform and systems, to ensure we offer the best solutions possible. For any questions regarding Strma 
                    Artists, <span class="features_abt">click here, </span>to contact our Team and we will be in-touch as soon as possible.
                    
                    </p>
                </div>
            </div>
        `;
        var mobile = `
            <div style="display: block; position: relative; left: -2vw;" class="navigation">
                <nav class="navmain navFAQ">
                    <article class="logoMain">
                        <img class="logomain_item" src="/assets/icon/strma_logo.png" onclick="nav_logo_click()">
                    </article>
                    <div data-name="Our Story" class="pg_cls_cnt" style="transform: scale(0.9); top: 12px;right: 10px;"><img onclick="cls_pg()" class="pg_cls_icn_" src="./../../assets/icon/page_cls_.png"></div>
                </nav>

            </div>
            <div class="ourStory_cont">
                <div class="story_content_">
                    <h1 class="story_hdr">Our Story</h1>
                    <p class="about_p">
                    Our pursuit is to ensure we liberate access for all lovers of Zimbabwean music whilst ensuring artists are compensated fairly 
                    along the journey. 
                    </p>


                    <h1 class="about_h">Music Listeners</h1>
                    <p class="about_p">
                    Accessing any song or artist you want at any time as a Zimbabwean, has thus far been challenge that many can attest to. 
                    As lovers of music ourselves, it is this problem and frustration that really called us to attempt fully solve this
                    issue and make music accessible for all, affordably and conviniently. Our aim is to ensure that music listeners can
                    access any song or artist, whenever they want without being hindered by problems associated with, access, cost or un-availability.
                    </p>
                    
                       
                    
                    <h1 class="about_h">Music Artists</h1>
                    <p class="about_p">
                    Without artists, there can be no music. At Strma it is our goal offer a platform that allows artists to exhibit their 
                    creations to the world, attain awareness for their talent, and earn a fair wage through the process. We continuosly
                    improving our platform and systems, to ensure we offer the best solutions possible. For any questions regarding Strma 
                    Artists, <span class="features_abt">click here, </span>to contact our Team and we will be in-touch as soon as possible.
                    
                    </p>
                </div>
            </div>
        `;

        output = ( $(document)[0].body.clientWidth < 600)? mobile : output;
        return output
    }
}

window.OurStory = OurStory;