# @my-librairie/Mfn-lib

Une bibliothèque Angular moderne pour la gestion des notifications (Toasts et Alerts).

## Caractéristiques

- 🎨 Design moderne avec Tailwind CSS
- 🚀 Composants standalone pour une intégration facile
- 📍 9 positions différentes pour les notifications
- 🎯 4 types de notifications prédéfinis (success, error, warning, info)
- ⚡ Performances optimisées avec des pipes personnalisés
- 🌗 Support du mode sombre
- ♿ Accessible (ARIA)
- 🔄 Animations fluides

## Installation

```bash
npm install @my-librairie/mfn-lib
```

### Dépendances requises

Cette bibliothèque nécessite :
- Angular >= 18.0.0
- Tailwind CSS

## Configuration

### 1. Configuration de Tailwind CSS

Ajoutez les chemins de la bibliothèque à votre fichier `tailwind.config.js` :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... vos chemins existants
    "./node_modules/@my-librairie/mfn-lib/**/*.{js,ts}"
  ],
  // ... reste de votre configuration
};
```

### 2. Importation des styles (optionnel)

Si vous souhaitez personnaliser les styles, vous pouvez créer un fichier CSS :

```css
/* styles.css */
.mfn-toast {
  /* Vos styles personnalisés */
}

.mfn-alert {
  /* Vos styles personnalisés */
}
```

## Utilisation

### Toast

```typescript
import { ToastService } from '@my-librairie/mfn-lib';

@Component({
  // ...
})
export class AppComponent {
  constructor(private toastService: ToastService) {}

  showToast() {
    // Utilisation simple
    this.toastService.success('Opération réussie !');

    // Avec titre
    this.toastService.error('Une erreur est survenue', 'Erreur');

    // Configuration avancée
    this.toastService.show({
      title: 'Titre personnalisé',
      message: 'Message détaillé',
      type: 'info',
      duration: 5000,
      position: 'top-center'
    });
  }
}
```

### Alert

```typescript
import { AlertService } from '@my-librairie/mfn-lib';

@Component({
  // ...
})
export class AppComponent {
  constructor(private alertService: AlertService) {}

  showAlert() {
    // Utilisation simple
    this.alertService.info('Information importante');

    // Avec titre
    this.alertService.warning('Attention', 'Avertissement');

    // Configuration avancée
    this.alertService.show({
      title: 'Titre',
      message: 'Message',
      type: 'success',
      position: 'middle-center',
      dismissible: true
    });
  }
}
```

## API

### Interfaces

```typescript
type Position = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

type Type = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface ToastData {
  id?: string;
  title?: string;
  message: string;
  duration?: number;
  type?: Type;
  backgroundColor?: string;
  textColor?: string;
  position?: Position;

}

interface AlertData {
  id?: string;
  title?: string;
  message: string;
  type?: Type;
  position?: Position;
  dismissible?: boolean;
}
```

### Services

#### ToastService

- `show(config: ToastConfig): string`
- `success(message: string, title?: string, options?: Partial<ToastConfig>): string`
- `error(message: string, title?: string, options?: Partial<ToastConfig>): string`
- `warning(message: string, title?: string, options?: Partial<ToastConfig>): string`
- `info(message: string, title?: string, options?: Partial<ToastConfig>): string`

#### AlertService

- `show(config: AlertConfig): string`
- `success(message: string, title?: string, options?: Partial<AlertConfig>): string`
- `error(message: string, title?: string, options?: Partial<AlertConfig>): string`
- `warning(message: string, title?: string, options?: Partial<AlertConfig>): string`
- `info(message: string, title?: string, options?: Partial<AlertConfig>): string`
- `dismiss(id: string): void`


## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le repository
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

MIT

## Support

Pour toute question ou problème, veuillez [ouvrir une issue](https://github.com/MyLibrairie/mfn-lib/issues).
