// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Search the bookmarks when entering the search keyword.
$(function() {
  $('#search').change(function() {
    $('#bookmarks').empty();
    dumpBookmarks($('#search').val());
  });
});
// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
  });
}

function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
}

function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    var anchor = $('<a>');
    anchor.attr('href', bookmarkNode.url);
    anchor.text(bookmarkNode.title);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    anchor.click(function() {
      chrome.tabs.create({
        url: bookmarkNode.url
      });
    });
    var span = $('<span>');
    var edit= $('<button>');
    edit.text('Edit');
    edit.click(function(event) {
      anchor.css('display', 'none');
      var editInput=$('<input>');
      editInput.val(bookmarkNode.title);
      var editOk=$('<button>');
      editOk.text('ok');
      editOk.click(function(event) {
        chrome.bookmarks.update(String(bookmarkNode.id), {
          title: editInput.val()
        });
        anchor.text(editInput.val());
        editInput.remove();
        editOk.remove();
        anchor.css('display', 'inline');
        editCancel.remove();


      });
      var editCancel=$('<button>');
      editCancel.text('Cancel');
      editCancel.click(function(event) {
        editInput.remove();
        editOk.remove();
        anchor.css('display', 'inline');
        editCancel.remove();
      });
      edit.parent().append(editInput);
      edit.parent().append(editOk);
      edit.parent().append(editCancel);

    });
    var del=$('<button>');
    del.text('Del');
    del.click(function(event) {
      console.log('del link ');
      chrome.bookmarks.remove(String(bookmarkNode.id));
      span.parent().remove();
    });
    //var options = bookmarkNode.children ? $('<span>[<a href="#" id="addlink">Add</a>]</span>') : $('<span>[<a id="editlink" href="#">Edit</a> <a id="deletelink" ' + 'href="#">Delete</a>]</span>');
    span.append(anchor);
    if(!bookmarkNode.children){
      span.append(edit);
      span.append(del);
    }
    
    // // Show add and edit links when hover over.
    //     span.hover(function() {
    //     $('#addlink').click(function() {
    //       $('#adddialog').empty().append(edit);
    //       $('#adddialog').dialog({autoOpen: false,
    //         closeOnEscape: true, title: 'Add New Bookmark', modal: true,
    //         buttons: {
    //         'Add' : function() {
    //            chrome.bookmarks.create({parentId: bookmarkNode.id,
    //              title: $('#title').val(), url: $('#url').val()});
    //            $('#bookmarks').empty();
    //            $(this).dialog('destroy');
    //            window.dumpBookmarks();
    //          },
    //         'Cancel': function() {
    //            $(this).dialog('destroy');
    //         }
    //       }}).dialog('open');
    //     });
    //     $('#editlink').click(function() {
    //      edit.val(anchor.text());
    //      var editOk=$('<button id=\'EditOK\'>');
    //      var editCancel=$('<button id=\'EditCancel\'>');
    //      $('#editdialog').empty().append(edit);
    //      // $('#editdialog').dialog({autoOpen: false,
    //      //   closeOnEscape: true, title: 'Edit Title', modal: false,
    //      //   show: 'slide', buttons: {
    //      //      'Save': function() {
    //      //         chrome.bookmarks.update(String(bookmarkNode.id), {
    //      //           title: edit.val()
    //      //         });
    //      //         anchor.text(edit.val());
    //      //         options.show();
    //      //         $(this).dialog('destroy');
    //      //      },
    //      //     'Cancel': function() {
    //      //         $(this).dialog('destroy');
    //      //     }
    //      // }}).dialog('open');
    //     });
    //     options.fadeIn();
    //   },
    //   // unhover
    //   function() {
    //     options.remove();
    //   }).append(anchor);
  }
  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(span);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}
document.addEventListener('DOMContentLoaded', function() {
  dumpBookmarks();
});