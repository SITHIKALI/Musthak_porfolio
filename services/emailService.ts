/**
 * Email Service for Contact Form
 * Uses Formspree for form submission (https://formspree.io)
 * 
 * To set up:
 * 1. Go to https://formspree.io
 * 2. Create a new form and get your form ID
 * 3. Replace the form ID in FORMSPREE_FORM_ID below
 */

const FORMSPREE_FORM_ID = 'xyzgweqo'; // Replace with your actual Formspree form ID
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _subject: `New Portfolio Message from ${formData.name}: ${formData.subject}`,
        _reply: formData.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.ok) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: data.error || 'Failed to send message. Please try again.' 
      };
    }
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
    };
  }
};

/**
 * Alternative: EmailJS Service
 * If you prefer EmailJS instead of Formspree:
 * 
 * 1. Install: npm install @emailjs/browser
 * 2. Get your service ID, template ID, and public key from EmailJS
 * 3. Use the code below:
 * 
 * import emailjs from '@emailjs/browser';
 * 
 * emailjs.init('YOUR_PUBLIC_KEY');
 * 
 * export const sendContactEmail = async (formData: ContactFormData) => {
 *   try {
 *     const result = await emailjs.send(
 *       'YOUR_SERVICE_ID',
 *       'YOUR_TEMPLATE_ID',
 *       {
 *         to_email: 'mohamadmusthakali@gmail.com',
 *         from_name: formData.name,
 *         from_email: formData.email,
 *         subject: formData.subject,
 *         message: formData.message,
 *       }
 *     );
 *     return { success: result.status === 200 };
 *   } catch (error) {
 *     return { success: false, error: error.message };
 *   }
 * };
 */
