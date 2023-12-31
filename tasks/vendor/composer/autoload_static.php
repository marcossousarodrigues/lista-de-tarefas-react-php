<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb179a9ab45900f072916c67658b63e64
{
    public static $files = array (
        '42e3dc2cf7383276e8c418f14b63f194' => __DIR__ . '/../..' . '/config/config.php',
    );

    public static $prefixLengthsPsr4 = array (
        'a' => 
        array (
            'app\\' => 4,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'app\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb179a9ab45900f072916c67658b63e64::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb179a9ab45900f072916c67658b63e64::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb179a9ab45900f072916c67658b63e64::$classMap;

        }, null, ClassLoader::class);
    }
}
