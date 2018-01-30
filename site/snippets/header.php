<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title><?= $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">
  <?= css("https://unpkg.com/flickity@2/dist/flickity.min.css") ?>
  <?= css('assets/css/index.css') ?>
</head>

<body>

<div class="wrapper">

<nav>
  <div class="grid">

    <p id="slide-number"></p>

    <div id="description"></div>

    <p class="index-trigger">
      <button id="information-toggle">Information</button>
      <button>Index</button>
    </p>
  </div>
</nav>