---
title: Create_Tracker_Item
createdAt: 2005-02-04T17:17-05:00
editedAt: 2005-02-04T23:54-05:00
---

<form method="POST" action="wiki.pl?id=trackertest">
Date:<input type="text" name="date"><br>
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

