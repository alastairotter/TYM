<?php 

$date = "2003-08";
$date = explode("-", $date);
var_dump($date);

$dates = cal_days_in_month(CAL_GREGORIAN, $date[1], $date[0]); // 31
echo $dates; 