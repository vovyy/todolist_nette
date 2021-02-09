<?php


namespace App\Presenters;

use Nette;
use App\Model\Main_model;
use CustomRoleManager\CustomRoleManager;
use Nette\Database\Context;
use Nette\Application\UI\Form;
use Nette\Utils\DateTime;
use Contributte\FormsBootstrap\BootstrapForm;
use Nette\Forms\Controls\Button;

final class HomepagePresenter extends Nette\Application\UI\Presenter
{
    private $main_model;

    public function __construct(Main_model $main_model)
    {
        $this->main_model = $main_model;
    }
    public $database;

    public function injectContext(Context $database)
    {
        $this->database = $database;
    }

    protected function createComponentPostForm(): Form
    {
        $form = new BootstrapForm;


        $form->addTextArea('popis', 'Popis:')
            ->setHtmlAttribute('placeholder', 'Zde napište úkol....')
            ->setHtmlAttribute('rows', '4')
            ->setHtmlAttribute('cols', '32')
            ->setRequired();


        $form->addText('konec', 'Konec:')
            ->setValue($today = date("m.d.y"))
            ->setHtmlAttribute('form-label, Konec:')
            ->setHtmlAttribute('type', 'text')
            ->setHtmlAttribute('class', 'daterange')
            ->setRequired();

        $form->addSubmit('send', 'Přidat')

            ->setHtmlAttribute('class', 'button button3 btn-block col-lg-12 col-md-12 col-sm-12')
            ->setHtmlAttribute('id', 'submit');



        $form->onSuccess[] = [$this, 'PostFormSucceeded'];


        return $form;
    }
    public function PostFormSucceeded(Form $form, $values): void
    {
        $formId = $this->getParameter('formId');

        if ($formId) {
            $form = $this->database->table('form')->get($formId);
            $form->update($values);
            $this->redirect('default');
        } else {

            $forms = $this->database->table('form')->insert($values);


            $this->redirect('default');
        }
    }

    public function actionDelete($id): void
    {
        $this->template->form = $this->main_model
            ->delete_by_id($id);

        $this->redirect('default');
    }
    public function renderDefault(): void
    {
        $this->template->form = $this->database->table('form');
    }
    public function actionEdit(int $formId): void
    {
        $form = $this->database->table('form')->get($formId);
        if (!$form) {
            $this->error('Příspěvek nebyl nalezen');
        }
        $this['postForm']->setDefaults($form->toArray());
    }
    public function pridat_checkbox(): void
    {
        $this->template->form = $this->main_model->insert_checkbox();
        $this->redirect('default');
    }
}
