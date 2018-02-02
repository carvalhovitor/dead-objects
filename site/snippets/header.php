<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title><?= $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">
  <?= css("https://unpkg.com/flickity@2/dist/flickity.min.css") ?>
  <?= css("assets/css/index.css") ?>
</head>

<body>

<div class="wrapper">

  <header>

    <div class="grid">

      <p id="slide-index"></p>

      <section id="object-information">
        <p id="object-title"></p>
        <p>
          <span id="object-year"></span>
          <span id="object-dimensions"></span>
        </p>
      </section>

      <nav>
        <button id="information-toggle">Information</button>
        <button id="index-toggle">Index</button>
      </nav>

    </div>

  </header>