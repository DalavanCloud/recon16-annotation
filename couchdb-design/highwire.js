{
  "_id": "_design/highwire",
  "_rev": "4-2fd52740c3cb086eefaf85437e31988e",
  "views": {
    "reference": {
      "map": "function(doc) {\n\nif (doc.document.highwire) {\n  if (doc.document.highwire.reference) {\n    for (var i in doc.document.highwire.reference) {\n      var s = doc.document.highwire.reference[i];\n      s = s.replace(/\\n\\s+/, '');\n      var parts = s.split(/;\\s*citation_/);\n       \n      var citation = {};\n      \n      for (var j in parts) {\n         var kv = parts[j].split('=');\n         var key = kv[0];\n         key = key.replace(/citation_/, '');\n\n         // customise the key(s) to match whatever data model for references we are using...\n         switch (key) {\n           case 'doi':\n             key = 'DOI';\n             break;\n           case 'journal_title':\n             key = 'container_title';\n             break;\n           case 'pages':\n             key = 'page';\n             break;\n           default:\n             break;\n         }\n\n         var value = kv[1];\n          if (!citation[key]) {\n           citation[key] = [];\n         }\n         citation[key].push(value);\n      }\n \n      emit(doc._id,  citation);\n     \n      \n    }\n }\n}\n\n}"
    },
    "reference_doi": {
      "map": "// get an identifier for this document\nfunction get_identifier(doc) {\n  var identifier = '';\n  var i = '';\n\n  if (doc.document) {\n \n    if (identifier === '') {\n      // highwire\n      if (doc.document.highwire) {\n        for (i in doc.document.highwire) {\n          switch (i) {\n            case 'doi':\n              identifier = doc.document.highwire[i][0];\n              break;\n            case 'pmid':\n              if (identifier === '') {\n                identifier = doc.document.highwire[i][0];\n              }\n              break;\n            default:\n              break;\n          }\n        }\n      }\n    }\n\n   if (identifier === '') {\n      // Dublin Core\n      if (doc.document.dc) {\n        for (i in doc.document.dc) {\n          switch (i) {\n            case 'Identifier':\n              identifier = doc.document.dc[i][0];\n              break;\n            default:\n              break;\n          }\n        }\n      }\n    }\n\n\n   if (identifier === '') {\n      // URI\n      if (doc.uri) {\n        identifier = doc.uri;\n       }\n    }\n \n\n  }\n\n  return identifier;\n} \n\nfunction(doc) {\n  var identifier = get_identifier(doc);\n  if (identifier !== '') {\nif (doc.document.highwire) {\n  if (doc.document.highwire.reference) {\n    for (var i in doc.document.highwire.reference) {\n      var s = doc.document.highwire.reference[i];\n      s = s.replace(/\\n\\s+/, '');\n      var parts = s.split(/;\\s*citation_/);\n       \n      var citation = {};\n      \n      for (var j in parts) {\n         var kv = parts[j].split('=');\n         var key = kv[0];\n         key = key.replace(/citation_/, '');\n\n         // customise the key(s) to match whatever data model for references we are using...\n         switch (key) {\n           case 'doi':\n             key = 'DOI';\n             break;\n           case 'journal_title':\n             key = 'container_title';\n             break;\n           case 'pages':\n             key = 'page';\n             break;\n           default:\n             break;\n         }\n\n         var value = kv[1];\n          if (!citation[key]) {\n           citation[key] = [];\n         }\n         citation[key].push(value);\n      }\n      if (citation.DOI) {\n        emit(identifier,  citation.DOI);\n      }\n      \n    }\n }\n}\n\n}\n}"
    }
  },
  "language": "javascript"
}