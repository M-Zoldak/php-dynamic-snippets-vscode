# PHP Dynamic Snippets

<!-- Currently no idea what to write here. :) -->

## Features

For now, extension brings 3 snippets:


`php` - boilerplate for php file with fulfilled namespace and class name
```php
<?php 
  
namespace __automatically__filled__psr_4__namespace__;
  
class __class_from_filename__{

}
```

\
`namespace` - outputs automatically filled namespace according to path and psr-4 definition
```php
namespace __automatically__filled__psr_4__namespace__;
```

\
`class` - outputs class with current filename

```php
class __class_from_filename__;
```

## Requirements

- composer.json must exist above in folder structure from the file where class being created/edited
- psr-4 defined inside composer.json
```json
// composer.json
{
    "psr-4": {
      "Tests\\": "tests/",
      "App\\": "src/"
    },
}
```


## Extension Settings

Currently no settings available

<!-- ## Known Issues

No known issues  -->

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release.
- Snippets `php`, `namespace`, `class` 
