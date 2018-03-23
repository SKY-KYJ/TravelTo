<?php
//注销登陆状态
//data/users/logout.php
session_start();
session_unset();
session_destroy();