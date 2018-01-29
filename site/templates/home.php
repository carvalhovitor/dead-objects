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

      <div class="grid">

          <p class="number"><?= $object->num() ?></p>

          <p class="description">
            <?= $object->title()->html() ?><br>
            
            <?php if (!$object->text()->empty()){
              echo $object->text()->html();
            }

            foreach($object->dimensions()->yaml() as $array): 
                $values = array_values($array);
                foreach ($array as $key => $value):
                  if ($key == "width" and !$object->text()->empty()) echo ", ";
                  if ($value != 0) echo $value;
                  if ($key == "width" or ($value != end($array) and !empty(current($array)))) { 
                    echo "&thinsp;&times;&thinsp;";
                  }
                  if ($value == end($array)) {
                    echo "&thinsp;cm";
                  }
                endforeach;
              endforeach; ?>

          </p>
            
        </div>
      
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

<?php snippet('footer') ?>