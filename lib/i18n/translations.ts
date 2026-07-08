// lib/i18n/translations.ts
export const translations = {
  en: {
    nav: { home: "Home", cart: "Cart", search: "Search", wishlist: "Wishlist", account: "Account" },
    header: { summerSale: "Summer Sale is here!", shopNow: "Shop Now" },

    breadcrumb: { home: "Home", cart: "Cart", wishlist: "Wishlist", contact: "Contact", about: "About" },

    contact: {
      title: "Contact",
      callToUs: "Call To Us",
      writeToUs: "Write To Us",
      availability: "We are available 24/7, 7 days a week.",
      phoneLabel: "Phone: +8801611122222",
      writeDesc: "Fill out our form and we will contact you within 24 hours.",
      email1: "Emails: customer@exclusive.com",
      email2: "Emails: support@exclusive.com",
      placeholders: {
        name: "Your Name *",
        email: "Your Email *",
        phone: "Your Phone *",
        msg: "Your Message *",
      },
      fieldNames: { name: "Name", email: "Email", phone: "Phone", msg: "Message" },
      validation: {
        name: { empty: "Please enter your name", error: "Please enter a valid name (at least 2 letters)", ok: "Looks good ✓" },
        email: { empty: "Email is required", error: "Please enter a valid email (e.g. name@example.com)", ok: "Valid email ✓" },
        phone: { empty: "Phone number is required", error: "Please enter a valid phone number (e.g. +98 912 345 6789)", ok: "Valid phone number ✓" },
        msg: { empty: "Message is required", error: "Message must be at least 10 characters long", ok: "Message received ✓" },
      },
      toast: {
        successTitle: "Message sent",
        successSub: "We'll get back to you soon",
        emptyFormTitle: "The form is empty",
        emptyFormSub: "Please fill in all fields",
        fieldEmptyTitle: "{field} is empty",
        fieldErrorTitle: "Invalid {field}",
      },
      send: "Send Message",
      sending: "Sending...",
    },

    quickView: {
      qty: "Qty",
      addToCart: "Add to Cart",
      outOfStock: "Out of Stock",
      inStock: "{count} In Stock",
      viewFullDetails: "View Full Details →",
    },

    productsGrid: {
      ourProducts: "Our Products",
      exploreTitle: "Explore Our Products",
      viewAll: "View All Products",
    },

    account: {
      title: "My Account",
      profile: "Profile",
      email: "Email",
      actions: "Actions",
      manageAccount: "Manage My Account",
      myOrders: "My Orders",
      myCancellations: "My Cancellations",
      myReviews: "My Reviews",
      logout: "Logout",
    },

    cart: {
      emptyTitle: "Your cart is empty",
      product: "Product",
      price: "Price",
      quantity: "Quantity",
      total: "Total",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "Free",
    },

    wishlist: {
      title: "wishlist",
      moveAllToBag: "Move All To Bag",
    },

    about: {
      title: "About",
      ourStory: "Our Story",
    },

    mobileMenu: {
      brandName: "Exclusive",
    },

    countdown: {
      days: "Days",
    },

    common: {
      loading: "Loading...",
      error: "Something went wrong",
      save: "Save",
      cancel: "Cancel",
    },
  },
  fa: {
    nav: { home: "خانه", cart: "سبد خرید", search: "جستجو", wishlist: "علاقه‌مندی‌ها", account: "حساب کاربری" },
    header: { summerSale: "حراج تابستانه شروع شد!", shopNow: "همین حالا بخر" },

    breadcrumb: { home: "خانه", cart: "سبد خرید", wishlist: "علاقه‌مندی‌ها", contact: "تماس با ما", about: "درباره ما" },

    contact: {
      title: "تماس با ما",
      callToUs: "تماس با ما",
      writeToUs: "پیام به ما",
      availability: "ما ۲۴ ساعته، ۷ روز هفته در دسترس هستیم.",
      phoneLabel: "تلفن: ۰۹۱۲۳۴۵۶۷۸۹",
      writeDesc: "فرم را پر کنید تا ظرف ۲۴ ساعت با شما تماس بگیریم.",
      email1: "ایمیل: customer@exclusive.com",
      email2: "ایمیل: support@exclusive.com",
      placeholders: {
        name: "نام شما *",
        email: "ایمیل شما *",
        phone: "تلفن شما *",
        msg: "پیام شما *",
      },
      fieldNames: { name: "نام", email: "ایمیل", phone: "تلفن", msg: "پیام" },
      validation: {
        name: { empty: "لطفاً نام خود را وارد کنید", error: "لطفاً یک نام معتبر وارد کنید (حداقل ۲ حرف)", ok: "خوبه ✓" },
        email: { empty: "ایمیل الزامی است", error: "لطفاً یک ایمیل معتبر وارد کنید (مثلاً name@example.com)", ok: "ایمیل معتبر ✓" },
        phone: { empty: "شماره تلفن الزامی است", error: "لطفاً یک شماره تلفن معتبر وارد کنید (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)", ok: "شماره معتبر ✓" },
        msg: { empty: "پیام الزامی است", error: "پیام باید حداقل ۱۰ کاراکتر باشد", ok: "پیام دریافت شد ✓" },
      },
      toast: {
        successTitle: "پیام ارسال شد",
        successSub: "به‌زودی با شما تماس می‌گیریم",
        emptyFormTitle: "فرم خالی است",
        emptyFormSub: "لطفاً همه‌ی فیلدها را پر کنید",
        fieldEmptyTitle: "{field} خالی است",
        fieldErrorTitle: "{field} نامعتبر است",
      },
      send: "ارسال پیام",
      sending: "در حال ارسال...",
    },

    quickView: {
      qty: "تعداد",
      addToCart: "افزودن به سبد",
      outOfStock: "ناموجود",
      inStock: "{count} موجود",
      viewFullDetails: "مشاهده جزئیات کامل ←",
    },

    productsGrid: {
      ourProducts: "محصولات ما",
      exploreTitle: "محصولات ما را کاوش کنید",
      viewAll: "مشاهده همه محصولات",
    },

    account: {
      title: "حساب کاربری من",
      profile: "پروفایل",
      email: "ایمیل",
      actions: "عملیات",
      manageAccount: "مدیریت حساب کاربری",
      myOrders: "سفارش‌های من",
      myCancellations: "لغوشده‌های من",
      myReviews: "نظرات من",
      logout: "خروج",
    },

    cart: {
      emptyTitle: "سبد خرید شما خالی است",
      product: "محصول",
      price: "قیمت",
      quantity: "تعداد",
      total: "مجموع",
      subtotal: "جمع جزء",
      shipping: "ارسال",
      free: "رایگان",
    },

    wishlist: {
      title: "علاقه‌مندی‌ها",
      moveAllToBag: "افزودن همه به سبد",
    },

    about: {
      title: "درباره ما",
      ourStory: "داستان ما",
    },

    mobileMenu: {
      brandName: "اکسکلوسیو",
    },

    countdown: {
      days: "روز",
    },

    common: {
      loading: "در حال بارگذاری...",
      error: "مشکلی پیش آمد",
      save: "ذخیره",
      cancel: "لغو",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof translations["en"];