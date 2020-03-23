<?php

function classLoader($className){
    $classPath = ROOT."./src/$className.php";
    if(is_file($classPath))
        include $classPath;
}

/*
     이 함수가 실행된 이후 클래스를 호출할 떄 실행되는 함수
*/
spl_autoload_register("classLoader");