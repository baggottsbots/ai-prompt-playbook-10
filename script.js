function handleCheckout(inputId) {
          var email = document.getElementById(inputId).value.trim();
          var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          if (!valid) {
            document.getElementById(inputId + '-err').style.display = 'block';
            return;
          }
          document.getElementById(inputId + '-err').style.display = 'none';
          window.__processDonation(1000, 'AI Prompt Playbook', email);
        }

// ===== PURCHASE HANDLER =====
    // Function: handlePurchase()
    // Purpose: Triggers the platform's payment processing for the AI Prompt Playbook
    // Amount: $10 = 1000 cents
    // Calls: window.__processPayment() — platform-injected Stripe checkout function
    // Triggers: All "Get Instant Access" CTA buttons on the page
    function handlePurchase() {
      // Collect email if available from any visible form (none on this page, so pass empty)
      // The platform's __processPayment handles Stripe checkout redirect automatically
      if (typeof window.__processPayment === 'function') {
        window.__processPayment({
          amountCents: 1000,
          productName: 'The AI Prompt Playbook',
          productDescription: '100+ battle-tested AI prompts for content, sales, automation, and business growth.',
          quantity: 1
        });
      } else if (typeof window.__processDonation === 'function') {
        // ===== FALLBACK: Use __processDonation if __processPayment is not available =====
        // Some platform versions inject __processDonation instead
        window.__processDonation(1000, 'AI Prompt Playbook');
      } else {
        // ===== DEV FALLBACK: Alert when neither function is injected (local testing only) =====
        console.warn('Payment function not available. In production, window.__processPayment or window.__processDonation will be injected by the platform.');
        alert('Payment processing is not available in this environment. This works on the live platform.');
      }
    }