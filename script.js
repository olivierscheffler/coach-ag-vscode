const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-menu]');

const applicationForms = document.querySelectorAll('form[data-netlify="true"]');

applicationForms.forEach((form) => {
    const isFrench = document.documentElement.lang.startsWith('fr');
    const messages = isFrench ? {
        required: 'Ce champ est obligatoire.',
        email: 'Entre une adresse courriel valide.',
        phone: 'Entre un numéro de téléphone valide.',
        choice: 'Choisis une réponse.'
    } : {
        required: 'This field is required.',
        email: 'Enter a valid email address.',
        phone: 'Enter a valid phone number.',
        choice: 'Choose an answer.'
    };
    const summary = form.querySelector('.form-errors');
    const fields = [...form.querySelectorAll('input, select, textarea')]
        .filter((field) => field.name !== 'form-name' && field.name !== 'bot-field');

    const getFieldError = (field) => {
        if (!field.value.trim()) {
            return field.tagName === 'SELECT' ? messages.choice : messages.required;
        }
        if (field.type === 'email' && field.validity.typeMismatch) {
            return messages.email;
        }
        if (field.name === 'phone' && !/^[+\d][\d\s().-]{6,}$/.test(field.value.trim())) {
            return messages.phone;
        }
        return '';
    };

    const setFieldError = (field, message) => {
        const wrapper = field.closest('.form-field');
        let error = wrapper.querySelector('.form-error');
        if (!error) {
            error = document.createElement('p');
            error.className = 'form-error';
            error.id = `${form.name}-${field.id}-error`;
            wrapper.append(error);
        }
        const hasError = Boolean(message);
        wrapper.classList.toggle('has-error', hasError);
        field.setAttribute('aria-invalid', String(hasError));
        field.setAttribute('aria-describedby', error.id);
        error.hidden = !hasError;
        error.textContent = message;
    };

    const validateField = (field) => {
        const message = getFieldError(field);
        setFieldError(field, message);
        return message;
    };

    fields.forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.getAttribute('aria-invalid') === 'true') {
                validateField(field);
            }
            if (fields.every((currentField) => !getFieldError(currentField))) {
                summary.hidden = true;
            }
        });
    });

    form.addEventListener('submit', (event) => {
        const invalidFields = fields.filter((field) => validateField(field));
        if (!invalidFields.length) {
            summary.hidden = true;
            return;
        }
        event.preventDefault();
        summary.textContent = isFrench
            ? `Vérifie les ${invalidFields.length} champs indiqués avant d'envoyer ta candidature.`
            : `Check the ${invalidFields.length} fields marked below before submitting your application.`;
        summary.hidden = false;
        invalidFields[0].focus();
    });
});

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        document.body.classList.toggle('menu-open', open);
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Ouvrir le menu');
            document.body.classList.remove('menu-open');
        });
    });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}
