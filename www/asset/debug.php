<?php
$assetId = $_GET['id'];
$asset = file_get_contents("https://assetdelivery.roblox.com/v1/assetId/$assetId");
print $asset;
?>
