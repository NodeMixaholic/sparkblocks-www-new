<?php
$assetId = $_GET['id'];
$asset = file_get_contents("https://assetdelivery.roblox.com/v1/assetId/$assetId");
$arr = json_decode($asset, true);
$location = $arr["location"];
$assetDL = file_get_contents($location);
print $assetDL;
?>
