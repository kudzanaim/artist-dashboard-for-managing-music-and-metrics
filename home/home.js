

// i. Main Container
var Home = {
    markUp(){
        var output = `
            <div > 
                <h1 class="headerTest">Artist Dashboard</h1>
            </div>
        `;
        return output
    },
    render(){
        var state_list = setInterval(function(){
            if( State.user.artistName != undefined){
                clearInterval(state_list);
                // i. Get HTML Page
                var pageHeader = Home.markUp();
        
                // ii. render header & SmallTotal Widgets
                var totalsContainer = `<div class="totalsCont"></div>`;
                Totals.render(pageHeader, totalsContainer);
                
                // iii. Render Main Dashboard
                var dashboard_ = new dashboardMain.constructor();
                var dashbrd_widgets = dashboard_.getData("widgets");
                
                // iv. Wait for all Data to be fully loaded
                var check_if_DataSet = setInterval( function(){
                    if( State.mostPopular != undefined && State.royaltiesData != undefined && State.streamsData != undefined &&  State.totals.loadState == 1){
        
                        clearInterval( check_if_DataSet);
                        // check if stream data has been set
                        var stream_listener = setInterval(function(){
                            if( State.streamsData.length == 3 && State.royaltiesData.length == 3){
                                clearInterval( stream_listener )
                                dashboard_.render_dashboard(dashbrd_widgets);
                            }
                        }, 10);
                    }
                },500)
            }
        },10)
    }
}

// ii. Total objects on Home Page
var Totals = {
    
    // b. Map thru data and render to DOM
    render: function( pageHeader_, totalsContainer_){

        // i. Get data from Data Method,  
        State.getStats();
        // ii. wait for data to be loaded
        var setcheck = setInterval(function(){
            if( State.mostPopular != undefined && State.royaltiesData != undefined && State.streamsData != undefined && State.totals.loadState == 1){

                clearInterval(setcheck);
                // ii. create stats object
                var totals_Values = State.totals;
                var totalItems = [
                            {title:"Singles Uploaded", value: totals_Values.singlesUploaded, style:"singlesC ripple"},
                            {title:"Albums Uploaded", value: totals_Values.albumsUploaded, style:"singlesC ripple"},
                            {title:"Total Streams", value: totals_Values.totalStreams, style:"singlesC ripple"},
                            {title:"Royalties Earned", value: `$`+ totals_Values.totalRoyalties.toFixed(2) , style:"singlesC ripple"}
                ];
                // ii. Render Header into DOM and append totals Container to DOM
                $(".root").html( pageHeader_);
                $(".root").append( totalsContainer_ );

                // iii. Map thru the Totals Data and pass data to MrkUp generating Method
                totalItems.map( function(item, index){     // will map thru users database to get Music Portfolio information
                    switch(   item.title.trim() ){
                        case "Albums Uploaded":
                            var t = Totals.markUp( item.title, item.value, item.style );
                                return  $(".totalsCont").append( t)
                        case "Singles Uploaded":
                            var t = Totals.markUp( item.title, item.value, item.style );
                                return  $(".totalsCont").append( t)
                        case "Total Streams":
                            var t = Totals.markUp( item.title, item.value, item.style );
                                return  $(".totalsCont").append( t) 
                        case "Royalties Earned":
                            var t = Totals.markUp( item.title, item.value, item.style );
                                return  $(".totalsCont").append( t) 
                    }
                })
            }
        }, 10);

    },
    // c. Generate MarkUp
    markUp: function(title_, value, styleClass){
        var output = `
            <div class="`+ styleClass +`">
                
                <div class="card-title">`+ title_ +`: </div>
                <div class="card-value">`+ numCommas(value) +` </div>
            </div>
        `;
        return output
    }
}

// iii. Main DashBoard Elements
var dashboardMain = {
    constructor: function(){
        var appDataLoaded = setInterval(function(){
            if( State.user != undefined){
                // i. kill interval
                clearInterval(appDataLoaded);
                // 1. Get _MostPopular data_ Database
                var get_data_promise = new Promise( function(res, rej){

                    // a. Get Songs
                    var songs_ = [];        var sorted_Array;         var artistName = State.user.artistName; // Must replace with Name from Actual User Database

                    firebase.database().ref("songs").orderByChild("artist").startAt(artistName).endAt(artistName+"\uf8ff").once("value").then( function(snapshot){
                        var data = ( snapshot.val() != null ) ? Object.values(snapshot.val()) : [];
                        songs_.push(data)
                    })
                    // b. Sort Song Array
                    .then(function(){
                        sorted_Array = songs_[0].sort(function(a,b){
                            return b.streamCount - a.streamCount
                        })
                    })
                    // c. Return sorted Array
                    .then(function(){
                        var setCheck = setInterval( function(){
                            if( sorted_Array.length != 0 && sorted_Array.length == songs_[0].length){
                                // i. clear interval and assign data to Object Property
                                clearInterval(setCheck);
                                State.mostPopular = sorted_Array;
                                // ii. if Data Length > 5
                                if( State.mostPopular.length > 5){   State.mostPopular.length = 5;    }
                                // iii. Resolve Main Promise
                                res()
                            } 
                            else{
                                // i. clear interval and assign data to Object Property
                                clearInterval(setCheck);
                                State.mostPopular = [];
                                // ii. if Data Length > 5
                                if( State.mostPopular.length > 5){   State.mostPopular.length = 5;    }
                                // iii. Resolve Main Promise
                                res()
                            }
                        },10)
                    })
                })
                // d. Get more Data
                .then(function(){
                    // Set State roaylties
                    State.royaltiesData = [];   State.streamsData = [];
                    var key = State.userKey;
                    
                    // get periodical Stream Stats
                    firebase_artists.database().ref(key).orderByChild("artist").once("value").then( function(snapshot){

                        var daily = snapshot.child("streamsByPeriod/dailyCounts").val();
                        var weekly = snapshot.child("streamsByPeriod/monthlyCounts").val();
                        var monthly = snapshot.child("streamsByPeriod/weeklyCounts").val();
                        
                        // Daily
                                State.streamsData.push(     {period:"Daily", value: daily.cumulativeTotal}    );
                                State.royaltiesData.push(     {period:"Daily", value: daily.cumulativeTotal*0.02}    );
                        // Weekly
                                State.streamsData.push(     {period:"Weekly", value: weekly.cumulativeTotal}    );
                                State.royaltiesData.push(     {period:"Weekly", value: weekly.cumulativeTotal*0.02}    );
                        // Monthly
                                State.streamsData.push(     {period:"Monthly", value: monthly.cumulativeTotal}    );
                                State.royaltiesData.push(     {period:"Monthly", value: monthly.cumulativeTotal*0.02}    );
                        // Total
                                var total = 0;
                                State.streamsData.map(function(item, index){
                                    total += item.value;
                                    if(index == State.streamsData.length-1 ){
                                        State.totalStreams = total;
                                    }
                                })
                    })
                })
            }
        }, 10);
        // a. Dashboard Widget Array
        State.dashboard_widgets = [
            {title:"Account Balance", style:"activities"},
            {title:"Stream Statistics", style:"activities"},
            {title:"Quick Upload", style:"activities"},
            {title:"Account Activity", style:"activities1"},
            {title:"Most Popular", style:"activities"}
        ];
        // Get data after object instatiatioon
        this.getData =  function(type){
             switch(type){
                case "widgets":
                    return State.dashboard_widgets
                case "activities":
                    return State.activities
                case "royalties":
                    return State.royaltiesData
                case "streams":
                    return State.streamsData
                case "most_popular":
                    return State.mostPopular
             }
        },
        // Render Widgets to DOM
        this.render_dashboard = function(widgets){
            
            // Define Widget container markup
            var small_widget_container = `<div class="smllWdgtCont"></div>`;
            
            // Render container for smaller widgets
            $(small_widget_container).insertAfter(".totalsCont");
    
            // Remove and Add Logged in class to body
            $("body").removeClass("body-login-main")
            $("body").addClass("body-logged-in");
    
            var _dashboard_ = new dashboardMain.constructor();

            // b. Map thru widget array and render to DOM
            widgets.map( function(item, index){
                switch( item.title){
                    
                    case "Account Activity":
                        var output = _dashboard_.markup( item.title, item.style );
                        var activity_array = _dashboard_.getData("activities")
                        $(".root").append( output );
                            return _dashboard_.renderAccntActivity( activity_array )
    
                    case "Account Balance":
                        var output = _dashboard_.markup( item.title, item.style );
                        var royaltiesArray_ = _dashboard_.getData("royalties");
                        
                        // i. Append Widget
                        $(".smllWdgtCont").append( output );
                        // ii. Apppend Items inside Widget
                        return royaltiesWidget.render(royaltiesArray_)
    
                    case "Stream Statistics":
                        var output = _dashboard_.markup( item.title, item.style );
                        var streamsArray_ = _dashboard_.getData("streams");
                        
                        // i. Append Widget
                        $(".smllWdgtCont").append( output );
                        // ii. Apppend Items inside Widget
                        return streamsWidget.render(streamsArray_)
    
                    case "Most Popular":
                        var output = _dashboard_.markup( item.title, item.style );
                        var mst_popular_Array = _dashboard_.getData("most_popular");
                        
                        // i. Append Widget
                        $(".smllWdgtCont").append( output );
                        // ii. Apppend Items inside Widget
                        return mostPopular.render(mst_popular_Array)
    
                    case "Quick Upload":
                        var output = _dashboard_.markup( item.title, item.style );
                        
                        // i. Append Widget
                        $(".smllWdgtCont").append( output );
                        // ii. Apppend Items inside Widget
                        return quickUploadWidget.render()
    
                    default:
                        var output = _dashboard_.markup( item.title, item.style );
                            return $(".smllWdgtCont").append( output )
                }              
            })
        },
        // generate widget markup
        this.markup = function(widget_name, style_){
            switch (widget_name) {
    
                // a. Account Balance Widget
                case "Account Balance":
                    var currentYear = new Date().getFullYear();
                    var annualTotal = numCommas(State.totalStreams * 0.02);
                    var markup_ = `
                    <div class="`+style_+`">
                        <div class="activity">`+widget_name+`</div>
                        <div class="accntAnnualTotal">
                            <div class="annualTotalVal"><span class="dlSign">$</span>`+ annualTotal +`</div>
                            <div class="annualTotalHeadr"> Total Earnings `+currentYear+`</div>
                        </div>
                        <div class="RoyaltyItemsCont">  </div>
                    </div>`;
                    return markup_
    
                // b. Streams Widget
                case "Stream Statistics":
                    var currentYear = new Date().getFullYear();
                    var annualTotal = numCommas(State.totalStreams);
                    var markup_ = `
                    <div class="`+style_+`">
                        <div class="activity">`+widget_name+`</div>
                        <div class="streamAnnualTotal">
                            <div class="annualTotalstream"><span class="dlSign"></span>`+ annualTotal +`</div>
                            <div class="annualTotalHeadr"> Total Streams for `+currentYear+`</div>
                        </div>
                        <div class="StreamsItemsCont">  </div>
                    </div>`;
                    return markup_
    
                // c. Most Popular Widget
                case "Most Popular":
                    var markup_ = `
                    <div class="`+style_+`">
                        <div class="activity">`+widget_name+`</div>
                        <div class="headerContMstPop">
                                    <div class="activity_name">Song Title</div>
                                    <div class="activity_name1">Artists</div>
                                    <div class="activity_name1">Streams</div>
                        </div>
                        <div class="popularSongsCont">  </div>
                    </div>`;
                    return markup_
    
                // d. Quick Upload Widget
                case "Quick Upload":
                    var markup_ = `
                    <div class="`+style_+` uploadItemMobile">
                        <div class="activity">`+widget_name+`</div>
                        <div class="buttonQckUpload">  </div>
                    </div>`;
                    return markup_
    
                default:
                    var markup_ = `<div class="`+style_+`"><div class="activity">`+widget_name+`</div></div>`;
                    return markup_
            }
        },
        this.renderAccntActivity = function(temp_Array_){
            // a. Get Data Array
            var temp_Array = temp_Array_;
            // b. Append Containers to Activity DIV
            var conteiner_Activity =  this.activityContainerMkUp();
            $(".activities1").append(conteiner_Activity);
    
            // c. Map thru activities and render Activity Container
            temp_Array.map( function(item, index){
                if(item != "all appended here"){
                    var output = `
                    <div class="activityCont_ ripple">
                        <div class="nameACT ripple">`+item.activity+`</div>
                        <div class="dateACT">`+item.date+`</div>
                    </div>
                    `;
                    // if rendering last item
                    if( index == (temp_Array.length - 2) && temp_Array.length > 12  ){
                        var showMore = `<div class="showMore ripple">Show More</div>`;
                        $(".activities1").append( showMore )
                    }
                    return $(".itemContAct").append( output )
                }
            })
        },
        this.activityContainerMkUp = function(){
            var output = `
                <div class="acctActivityGrid">  
                            <div class="headerContAct" >
                                    <div class="activity_name"> Activity </div>
                                    <div class="activity_name1" > Date </div>
                            </div>
                            <div class="itemContAct"></div>
                </div>`;
            return output
        }
    },
    
}

// a. account balance Widget
var royaltiesWidget = {
    markUp: function(period_, amount_){
        var output = `
            <div class="royaltyItem">
                <div class="royalty_period">`+period_+`</div>
                <div class="royalty_amount">$`+numCommas(amount_)+`</div>
            </div>
        `;
        return output
    },
    render: function(itemsArray_){
        // i. Get royalty data
        var items_ =  itemsArray_;
        
        // ii. Map thru widget items
        items_.map( function(item, index){
            var markUp = royaltiesWidget.markUp( item.period, item.value);
            return $(".RoyaltyItemsCont").append(markUp)
        })
    }
}
// b. streams widget
var streamsWidget = {
    markUp: function(period_, amount_){
        var output = `
            <div class="streamItem">
                <div class="royalty_period">`+period_+`</div>
                <div class="royalty_amount">`+ amount_ +`</div>
            </div>
        `;
        return output
    },
    render: function(itemsArray_){
        // i. Get royalty data
        var items_ =  itemsArray_;
        
        // ii. Map thru widget items
        items_.map(function(item){

            // i. Less than Thousand
            if(item.value <  10000  ){
                var item_ = item.value;
                var markUp = streamsWidget.markUp( item.period, item_);
                return $(".StreamsItemsCont").append(markUp)
            }
            // iii. Less than 100 Thousand
            else if(item.value >  10000  &&  item.value <  1000000  ){
                var item_ = ( item.value / 1000 ).toFixed(1) + "k";
                var markUp = streamsWidget.markUp( item.period, item_);
                return $(".StreamsItemsCont").append(markUp)
            }
            // v. Less than 100 Million
            else if(item.value >  1000000  &&  item.value <  1000000000  ){
                var item_ = (item.value / 1000000).toFixed(1) + "m";
                var markUp = streamsWidget.markUp( item.period, item_);
                return $(".StreamsItemsCont").append(markUp)
            }
            // vi. Less than 1 Billion
            else if(  item.value >  1000000000 ){
                var item_ = (item.value / 1000000000).toFixed(1) + "bn";
                var markUp = streamsWidget.markUp( item.period, item_);
                return $(".StreamsItemsCont").append(markUp)
            }
            
        })

    }   
}
// c. most popular widget
var mostPopular = {
    markUp: function( sngTitle_, artist_, streamCount_ ){
        var output = `
            <div class="mstPopItem ripple">
                <div class="mstPopSongTitle"><div class="mstpop_insideItem">`+ sngTitle_ +`</div></div>
                <div class="mstPopArtist"><div class="mstpop_insideItem">`+ artist_ +`</div></div>
                <div class="mstPopStreamCount"><div class="mstpop_insideItem">`+ streamCount_ +`</div></div>
            </div>
        `;
        return output
    },
    render: function(itemsArray_){
        // i. Get royalty data
        var items_ =  itemsArray_;
        
        // ii. Map thru widget items
        items_.map( function(item, index){
            var markUp = mostPopular.markUp(  item.songTitle, item.artist, item.streamCount  );
            return $(".popularSongsCont").append(markUp)
            // console.log( item)
        })
    }
}
// d. Quick upload Widget
var quickUploadWidget = {
    markUp: function(){
        var output = `
            <div class="uploadItem ripple" onclick="uploadSong(this)">
                <svg  class="single_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 487.001 487.001" style="enable-background:new 0 0 487.001 487.001;" xml:space="preserve"><g><g>
                    <g><path d="M83.389,472.892c46.052,0,83.385-37.334,83.385-83.385c0-0.021-0.003-0.047-0.003-0.067h0.003V118.911h267.828v193.182    c-9.582-3.842-20.029-5.975-30.984-5.975c-46.052,0-83.384,37.334-83.384,83.385c0,46.053,37.329,83.389,83.382,83.389    c46.054,0,83.386-37.334,83.386-83.385c0-0.021-0.002-0.047-0.002-0.067h0.002V118.911V14.109H434.6H166.773H114.37v104.802    v193.182c-9.583-3.842-20.03-5.975-30.985-5.975C37.333,306.119,0,343.453,0,389.503C0,435.556,37.336,472.892,83.389,472.892z" data-original="#000000" fill="#ffffff"/>
                </g></g></g>
                </svg>
                <div class="uploadtxt">UPLOAD SINGLE</div>
            </div>

            <div class="uploadItem ripple"  onclick="uploadSong(this)">
            <svg class="album_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"  viewBox="0 0 417.027 417.027" style="enable-background:new 0 0 417.027 417.027;" xml:space="preserve" class=""><g><g>
                <polygon points="110.647,83.942 322.464,83.942 285.127,3.231  " data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                <polygon points="362.397,313.626 417.027,288.352 362.397,170.267  " data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                <polygon points="16.839,127.339 0,135.135 16.839,171.521  " data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                <path d="M34.502,413.796h314.166V99.644H34.502V413.796z M127.082,288.039c9.804-3.911,19.761-4.509,27.633-2.293v-51.979   c-0.016-0.129-0.042-0.253-0.042-0.381v-35.017c0-2.677,2.17-4.841,4.853-4.841l87.253-16.158c2.669,0,4.837,2.158,4.837,4.833   v25.407c0.085,0.469,0.133,0.942,0.133,1.436v93.649c0,1.306-0.325,2.532-0.897,3.618c-2.722,9.27-11.723,18.438-24.294,23.46   c-18.177,7.253-36.912,3.105-41.849-9.27c-4.929-12.371,5.797-28.28,23.97-35.518c9.796-3.907,19.747-4.492,27.63-2.284v-58.709   l-66.147,12.267v69.489c0,1.31-0.329,2.544-0.9,3.626c-2.725,9.27-11.722,18.423-24.299,23.443   c-18.174,7.254-36.906,3.106-41.844-9.269C98.176,311.189,108.908,295.288,127.082,288.039z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/></g></g>
            </svg>
                <div class="uploadtxt">UPLOAD ALBUM</div>
            </div>
        `;
        return output
    },
    render: function(){
        var markup = quickUploadWidget.markUp();
        return $(".buttonQckUpload").append(markup)
    }
}
window.numCommas = function(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

