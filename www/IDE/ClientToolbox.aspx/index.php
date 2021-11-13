<?php
$dir = "/var/www/html/IDE/toolbox-assets/";
$files = glob($dir . "*.*");

foreach($files as $file) {
echo "<a href='/IDE/toolbox-assets/" . basename($file) . "'>" . basename($file) . "</a>";
}
?>
