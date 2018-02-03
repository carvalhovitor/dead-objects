<?php snippet('header') ?>

<main id="carousel">

  <?php $objects = page('objects')->children()->visible(); ?>

  <section id="title-card" class="slide">
    <div class="grid">
      <h1><?= site()->title()->html() ?></h1>
    </div>
  </section>

  <?php foreach($objects as $object): ?>

    <section id="<?= $object->slug() ?>" class="object slide">
      
      <div class="image">
        <?php foreach($object->images()->limit(1) as $image): ?>
          <img src="<?= $image->url() ?>">
        <?php endforeach ?>
      </div>

    </section>

  <?php endforeach ?>
    
</main>

  <aside class="closed">
    <section id="information" class="information slide closed">
      <div class="grid">
        <div class="information-wrapper">
          <?php echo $page->text()->kirbytext() ?>
        </div>
      </div>
    </section>
  
    <section id="index" class="closed">
      <div class="grid">
  
          <div class="line"></div>
          <div id="number"></div>
  
          <ul>
            <?php foreach($objects->sortBy('title', 'asc') as $object): ?>
              <li><a data-number="<?= $object->num(); ?>" href="#<?= $object->slug(); ?>"><span><?= $object->title()->html() ?><span></a></li>
            <?php endforeach ?>
          </ul>
  
      </div>
    </section>

    <button id="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path stroke-miterlimit="10" d="M.5 49.5l49-49M.5.5l49 49"/></svg>
    </button>
  </aside>

  <script type="text/javascript">

    <?php
      $count = 0;
      $json = [];

      foreach($objects as $object) {
          $json[$count]['title'] = $object->title()->value();
          if (!$object->text()->empty()) $json[$count]['year'] = $object->text()->value();

          foreach($object->dimensions()->yaml() as $array) {
            $values = array_values($array);

            foreach ($array as $key => $value) {

              // Starts prop with empty string so we can concatenate all the information later
              
              if (!isset($json[$count]['dimensions'])) $json[$count]['dimensions'] = '';

              if ($key == "width" and !$object->text()->empty()) $json[$count]['dimensions'] .= ", ";
              if ($value != 0) $json[$count]['dimensions'] .= $value;
              if ($key == "width" or ($value != end($array) and !empty(current($array)))) { 
                $json[$count]['dimensions'] .= "&thinsp;&times;&thinsp;";
              }
              if ($key == "depth") $json[$count]['dimensions'] .= "&thinsp;cm";
            }
          }
          $count++;
      }
    ?>

    let objects = <?= json_encode($json); ?>

  </script>

<?php snippet('footer') ?>