const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
const DEFAULT_PATH_AVATAR = 'img/muffin-grey.svg';

const avatarFileSelect = document.querySelector('#avatar');
const avatarFilePreview = document.querySelector('.ad-form-header__preview img');
const housingFileSelect = document.querySelector('#images');
const housingFilePreview = document.querySelector('.ad-form__photo');

const uploadAvatar = () => {
  avatarFileSelect.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarFilePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetAvatar = () => {
  avatarFilePreview.src = DEFAULT_PATH_AVATAR;
};

const uploadHousingPreview = () => {

  housingFileSelect.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const image = document.createElement('img');
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.objectFit = 'cover';
        image.src = reader.result;
        housingFilePreview.style.overflow = 'hidden';
        housingFilePreview.innerHTML = '';
        housingFilePreview.append(image);
      });

      reader.readAsDataURL(file);
    }
  });

};

const resetHousingPreview = () => {
  const image = housingFilePreview.querySelector('img');

  if (image) {
    image.remove();
  }
};

export { uploadAvatar, uploadHousingPreview, resetAvatar, resetHousingPreview };
