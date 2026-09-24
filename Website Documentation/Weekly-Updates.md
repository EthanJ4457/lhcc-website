### Embedded Youtube Link Replacement

For any Embedded Youtube Video you must go onto the video, select share, then "Embed", a copy and paste-able similar to this:

` <iframe width="560" height="315" src="https://www.youtube.com/embed/G3DmeQmE9XA?si=LQI0vWCfkrn_5VAs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`

will pop up, ONLY COPY THE LINK (https://www.youtube.com/embed/)

Once you have the link copied go into "index.html", look for a comment saying:
" <!---------------CHANGE BELOW LINK TO NEW SERMON-------------------->"
replace the link BELOW this text with the link you copied. This will replace the embedded link on the front page of the website.


### Sermon Page

#### Adding Newest Sermon to "Explore Teaching"

Every week after the newest sermon by Pastor Mark go onto Sermons.html and look for the text:
                        <!-- ADD WEEKLY SERMON AFTER SERVICE BELOW-->
Once you find this text right below it or above the previous `<li></li>` section you must copy and paste the following:

			`<li> Week #: Sermon Title - Bible Readubg</li>`

Update it with all the correct information

**NOTE: IF THIS WEEK'S SERMON DOES NOT FALL UNDER THIS SERIES DO NOT PUT IT HERE**

#### Latest Teaching Information

Every week after the newest sermon by any speaker go into Sermons.html and look for the text:
                    <!-- CHANGE BELOW INFORMATION FOR THE LATEST SERMON INFORMATION -->
                    
You must edit the following sections:
- `<h3>` replace the text inside with the latest sermon's title
- `<p>`  replace the text inside with a short/brief description of the sermon
- `<span>` start from the first span block and move downward
	- First, add the latest bible verse read
	- Second, add the Pastor/Speaker's name



#### Guest Speaker Sermon

If we have a guest speaker speak you must update the "Speakers" folder or the drop down will not display all sermons by them.

###### ABIGAIL AND NIKITA

For a sermon by Abigail and Nikita:
- Copy the link to the live/video that happened during Sunday
- Go into the "Speakers" folder 
- Select the respective .txt file ("Abigail-Jallim.txt" or "Nikita-Abraham.txt")
- Paste the link at the TOP of the file

For a sermon by any other guest speaker:
- Copy the link to the live/video that happened during Sunday
-  Go into the "Speakers" folder 
- Select the "Other.txt" file
- Paste the link at the TOP of the file
- Right after the link and a space then a - another space then the name of the speaker
	- EX. `youtube link - Speaker's name`


#### New Sermon Series

