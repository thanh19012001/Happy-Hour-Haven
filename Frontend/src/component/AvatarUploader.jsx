// AvatarUploader.jsx
import { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useTranslation } from 'react-i18next';

const AvatarUploader = ({ currentAvatar, onUpdateAvatar }) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [preview, setPreview] = useState(currentAvatar);
  const editorRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (e) => {
    const scaleValue = parseFloat(e.target.value);
    setScale(scaleValue);
  };

  const handleSave = () => {
  if (editorRef.current) {
    const canvas = editorRef.current.getImageScaledToCanvas();
    const dataUrl = canvas.toDataURL();
    setPreview(dataUrl);
    onUpdateAvatar(dataUrl);
    setImage(null); // turn off crop image
  }
};

  const handleReset = () => {
    setImage(null);
    setScale(1);
  };

  return (
    <div className="avatar-uploader">
      <div className="current-avatar">
        <h2>{t('currentAvatar', 'Current Avatar')}</h2>
        {preview && (
          <img 
            src={preview} 
            alt="Current avatar" 
            style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: '10px 0' }}
        />
        
        {image && (
          <div className="crop-section">
            <h2>{t('cropAvatar', 'Crop Avatar')}</h2>
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
              scale={scale}
              rotate={0}
            />
            
            <div className="scale-control">
              <label>{t('zoom', 'Zoom')}:</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={scale}
                onChange={handleScaleChange}
                style={{ width: '200px', margin: '10px' }}
              />
            </div>
            
            <div className="avatar-actions">
              <button onClick={handleSave} style={{ margin: '5px' }}>
                {t('saveAvatar', 'Save Avatar')}
              </button>
              <button onClick={handleReset} style={{ margin: '5px' }}>
                {t('cancel', 'Cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarUploader;
