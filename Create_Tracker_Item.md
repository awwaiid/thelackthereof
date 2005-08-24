---
title: Create_Tracker_Item
createdAt: 2005-08-24T19:05-04:00
editedAt: 2005-08-24T19:06-04:00
---

Use this form to create a new tracker item. You may also want to look at the [[Tracker Status]] page for an overview of tracker items, or the [[Tracker Search]] page for advanced tracker searching.


<form method="POST" action="wiki.pl?id=trackertest">
<style>
  td {
    border: 0;
  }
</style>

<input type=hidden name="bypass" value='awwaiid'>
  <table border=0 cellspacing=3 style="border: 0">
    <tr>
      <th>Title</th>
      <th>Due</th>
    </tr>
    <tr>
      <td>

<script language="JavaScript"><!--
var date = new Date();
var d  = date.getDate();
var day = (d < 10) ? '0' + d : d;
var m = date.getMonth() + 1;
var month = (m < 10) ? '0' + m : m;
var yy = date.getYear();
var year = (yy < 1000) ? yy + 1900 : yy;

document.write("<input type=text name=title size=50 value='TRACKER - " + year + "." + month + "." + day + " - '><br>");
//-->
</script>
<input type="hidden" name="status" value="open">
      </td>
      <td><input type="text" name="due" size=10></td>
      <td><select name="project">
            <option>Other</option>
            <option>Timesheet</option>
          </select></td>
    </tr>
    <tr>
      <th>Description</th>
      <th>&nbsp;</th>
    </tr>
    <tr>
      <td colspan=2><textarea cols="60" rows="5" name="description"></textarea></td>
    </tr>
  </table>

    <p><input type="submit" value="Save">
    <input type="hidden" name="template" value="
* Project: [project]
* Status: [status] (open, closed)
* Due: [due]

[description]    
">
</form>

