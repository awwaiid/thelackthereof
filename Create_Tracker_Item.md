---
title: Create_Tracker_Item
createdAt: 2005-02-04T23:59-05:00
editedAt: 2005-02-05T00:00-05:00
---

<form method="POST" action="wiki.pl?id=trackertest">
  <table>
    <tr>
      <td>Title:</td>
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

      </td>
    </tr>
    <tr>
      <td>Status:</td>
      <td><input type="text" name="status"></td>
    </tr>
    <tr>
      <td>Due:</td>
      <td><input type="text" name="due"></td>
    </tr>
  </table>

Description:
<textarea cols="60" rows="5" name="description"></textarea>
    <p><input type="submit" value="Save">
    <input type="hidden" name="template" value="
* Status: [status]
* Due: [due]

[description]    
">
</form>

