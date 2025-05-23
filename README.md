# PHP Dynamic Snippets

Not gonna lie, most code was written by Chat-GPT. :)

## Features

For now, extension brings 3 snippets with it:\

`php` - boilerplate for php file with fulfilled namespace and class name

```php
<?php

namespace __AutomaticallyFilledPSR4Namespace__;

class __ClassFromFilename__{}
```

\
`namespace` - outputs automatically filled namespace according to path and psr-4 definition

```php
namespace __AutomaticallyFilledPSR4Namespace__;
```

\
`class` - outputs class with current filename

```php
class __ClassFromFilename__{}
```

## Requirements

- composer.json must exist in folder structure above file from where the class is being created/edited
- psr-4 paths defined inside composer.json

```json
// composer.json
{
  "psr-4": {
    "Tests\\": "tests/",
    "App\\": "src/"
  }
}
```

## Extension Settings

Currently no settings available

<!-- ## Known Issues

No known issues  -->

## Release Notes

### 1.0.2

- add loading for "autoload-dev" declarations

### 1.0.1

- add namespaces caching

### 1.0.0

Initial release.

- Snippets `php`, `namespace`, `class`
