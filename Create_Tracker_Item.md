---
title: Create_Tracker_Item
createdAt: 2005-02-04T23:54-05:00
editedAt: 2005-02-04T23:54-05:00
---

<form method="POST" action="wiki.pl?id=trackertest">
Date:<input type="text" name="date"><br>

<script language="JavaScript"><!--
var date = new Date();
var d  = date.getDate();
var day = (d < 10) ? '0' + d : d;
var m = date.getMonth() + 1;
var month = (m < 10) ? '0' + m : m;
var yy = date.getYear();
var year = (yy < 1000) ? yy + 1900 : yy;

document.write("Title:<input type=text name=title value='TRACKER - " + year + "." + month + "." + day + " - ";
//--></script>

Title:<input type="text" name="title" value="TRACKER - "><br>
Status:<input type="text" name="status"><br>
Due:<input type="text" name="due"><br>
Description:
<textarea cols="60" rows="5" name="description"></textarea>
    <p><input type="submit" value="Save">
    <input type="hidden" name="template" value="
* Date: [date]
* Title: [title]
* Status: [status]
* Due: [due]

[description]    
">
</form>

