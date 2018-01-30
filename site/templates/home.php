<?php snippet('header') ?>
<main id="carousel">

<?php $objects = page('objects')->children()->visible(); ?>

  <section id="title-card" class="title-card">
    <div class="grid">
      <h1><?= site()->title()->html() ?></h1>
    </div>
  </section>

  <?php foreach($objects as $object): ?>

    <section id="<?= $object->slug() ?>" class="object">
      
      <div class="image">
        <?php foreach($object->images()->limit(1) as $image): ?>
          <img src="<?= $image->url() ?>">
        <?php endforeach ?>
      </div>

    </section>

    <?php endforeach ?>
    
  </main>

  <section id="information" class="information">
    <div class="grid">
      <div class="information-wrapper">
        <?php echo $page->text()->kirbytext() ?>
      </div>
    </div>
  </section>

  <section id="index">
    <div class="grid">

        <div class="line"></div>
        <div id="number"></div>

        <ul>
          <!-- <p>INDEX</p> -->
          <?php foreach($objects->sortBy('title', 'asc') as $object): ?>
            <li><a data-number="<?= $object->num() ?>" href=""><span><?= $object->title()->html() ?><span></a></li>
          <?php endforeach ?>
        </ul>

    </div>

  </section>

  <script type="text/javascript">

    <?php
      $count = 0;
      $json = [];

      foreach($objects as $object) {
          $json[$count]['information'] = $object->title()->value() . "<br>";

          if (!$object->text()->empty()) $json[$count]['information'] .= $object->text()->value();

          foreach($object->dimensions()->yaml() as $array) {

            $values = array_values($array);

            foreach ($array as $key => $value) {

              // Starts prop with empty string so we can concatenate all the information later
              if (!isset($json[$count]['information'])) $json[$count]['information'] = '';

              if ($key == "width" and !$object->text()->empty()) $json[$count]['information'] .= ", ";
              if ($value != 0) $json[$count]['information'] .= $value;
              if ($key == "width" or ($value != end($array) and !empty(current($array)))) { 
                $json[$count]['information'] .= "&thinsp;&times;&thinsp;";
              }
              if ($value == end($array)) $json[$count]['information'] .= "&thinsp;cm";
            }
            
          }
          
          $count++;
      }
    ?>

    var objects = <?= json_encode($json); ?>

  </script>

<?php snippet('footer') ?>