# Ember Notes

* when I have an array of records it responds to the didLoad event to
  know when the array content didLoad as same of the model instances

## TASKS

* BUGS
  * remove family color when the family is deleted
  * when node deleted another is automatically "selected"
  * when enter saving family form it dismissed but the window still black

* Multiple Families
  * backend fix of multiple families [DONE]
  * front-end of multiple families
    * use a multiple select [DONE]
    * node/families when node deleted [DONE]
    * node/families when node saved [DONE]
    * load famlies when the node is edited [DONE]
    * fix creating actors when selected [DONE]
    * display node with family colors
  * add chosen plugin to the family selector [DONE]


* Click Families [DONE]
  * set an uniq selected family [DONE]
  * set only actor families clickable in actor mode [DONE]
  * set only relation families clickable in relaiton mode [DONE]
  * create actors of this family [DONE]
  * create relations of this family [DONE]

* Roles [DONE]
  * backend [DONE]
    * crear modelo de roles [DONE]
    * hacer relaciones con nodos [DONE]
    * que el rol se destruya cuando se elimina uno de sus nodos [DONE]
  * front [DONE]
    * crear roles [DONE]
      * habilitar drag and drop [DONE]
        * mostrar flecha mientras hago drag and drop sólo para actores [DONE]
        * cuando la suelto, debe crear el rol correspondiente entre el actor y
          la relación [DONE]
          * le asigna un nombre automáticamente [DONE]
          * lo guarda automáticamente [DONE]
        * si no está el par actor-rol ok, se cancela todo [DONE]
        * disappear the creation arrow [DONE]
      * visualizar roles [DONE]
        * nombre [DONE]
        * line [DONE]
      * formulario de roles [DONE]
    * editar rol [DONE]
      * dragging updates role [DONE]
    * clickear y editar [DONE]
    * eliminar [DONE]
    * que eliminar actor elimine sus roles [DONE]
    * que eliminar relaciones elimine sus roles [DONE]

* Relations [DONE]
  * add relation [DONE]
    * filter option families [DONE]
    * represent them as squares [DONE]
    * persist them [DONE]
    * go to role mode after persisting [DONE]
  * edit [DONE]
  * delete [DONE]

* Basic Edition Mode
  * set defaut mode [DONE]
  * change modes when clicking the mode buttons [DONE]
  * dragging only in hand mode [DONE]
  * creating new actors only in actor mode [DONE]
  * scope families given the current mode

* families [DONE]
  * delete [DONE]
   * delete operation [DONE]
   * (update node display) [DONE]
  * edit [DONE]
   * edit actual operation [DONE]
   * (update node display) [DONE]
  * better color selection [DONE]
  * modal form [DONE]
* Node-Family [DONE]
  * accept empty value on select [DONE]
  * update view [DONE]
* actorsFamilies [DONE]
  * clean array [DONE]
* selection [DONE]
  * replace color with stroke [DONE]

* treat canvas as an object

* insert svg text when creating actor [DONE]
* delete svg text when deleting actor [DONE]
* update svg text when updating actor [DONE]
