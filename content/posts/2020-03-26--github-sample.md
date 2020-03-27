---
title: Setup Netlify CMS For Gatsby Website
subTitle: sample
createAt: 2020-03-26T08:16:14.185Z
category: github
draft: false
cover: /media/rand.jpg
tags:
  - rand
  
---
# Collection Types

All editable content types are defined in the`collections`field of your`config.yml`file, and display in the left sidebar of the Content page of the editor UI.

Collections come in two main types:`folder`and`files`.

## [](https://www.netlifycms.org/docs/collection-types/#folder-collections)Folder collections

Folder collections represent one or more files with the same format, fields, and configuration options, all stored within the same folder in the repository. You might use a folder collection for blog posts, product pages, author data files, etc.

Unlike file collections, folder collections have the option to allow editors to create new items in the collection. This is set by the boolean`create`field.

**Note:**Folder collections must have at least one field with the name`title`for creating new entry slugs. That field should use the default`string`widget. The`label`for the field can be any string value. If you wish to use a different field as your identifier, set`identifier_field`to the field name. See the[Collections reference doc](https://www.netlifycms.org/docs/configuration-options/#collections)for details on how collections and fields are configured. If you forget to add this field, you will get an error that your collection "must have a field that is a valid entry identifier".
