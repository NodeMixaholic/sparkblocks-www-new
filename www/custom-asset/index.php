<?php
$assetId = $_GET['id'];
$asset = file_get_contents("https://sparksammy.com/custom-asset/$assetId");
print $asset;
?>
