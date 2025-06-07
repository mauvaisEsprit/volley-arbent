const partenaires = [
  {
    nom: "CLER",
    logo: "https://lh6.googleusercontent.com/K4QAhDLNjzaNwvvezCDN0RSEQo5vTMsrdm0i4ciQu3S9JK2Hhf1u7oIjjxk_iDpAsFDRR7hp2i45asRtR3hee5v6tDD_1hQvfq848fs0qqHCcVuJOHDpsrkLhqNArEcq7RJoyi_PG9r-vriFRZHF9hdmsqaGyKgdX8854M8_utiyyOHMmfDfdA=w1280",
  },
  {
    nom: "HP2S",
    logo: "https://lh6.googleusercontent.com/BNpwNP2BBjrQRjCi-VFe6vQ4kR2H-OuQ9_9XMlG7DWo8JsrgEVdTna8Poop54DiJbn6GykvC4a0NkpXTePU3vXWwEQfpjVa-J3BDZA4a4HSScdXIVC9zVvxjZaiHas9gMmDIPb00Lp5X0kD_8OQ6oJcP8iWQOot-d8edZdV8sUpNxzFb6VpaYw=w1280",
  },
  {
    nom: "Source Shop",
    logo: "https://lh6.googleusercontent.com/vf0VoHzm1R-k8v1l4kGPYnxPGSwzWKI-J-S06cBKU2VRSYB5wlQBloz7mSHEjR4nwHn1tVRGCDZlIUcAMMm-qKlzWYu77ZCaWxpcJhwkq0Ez1G3ShU6AZkzA333LjyTlpM2wKeW1XKqKDkIEl44h8CSc8cU2m2ItRqKXnGlDsysv-ookQmwRXA=w1280",
  },
  {
    nom: "Vegasian",
    logo: "https://lh5.googleusercontent.com/0iTyvaVXxDVE0vY1UrtN3oNDjhm17IVmSHeJMvJ_ma3lAXxC6unE0euS9_542rswxSbm4XvytEeLlWVDPtsl4eWjHZxXdjy0bOxLGhxwGh4ezuUsG-t5_zSkfMsRzhylPqtVF8uNK9Y6dqNu9Oy2S76g2KiCCrmJKXWSgisXUzSyfLZmoTjFhQ=w1280",
  },
  {
    nom: "Pesenti",
    logo: "https://lh3.googleusercontent.com/mseKhWDSzb8MFp1nbekU-llQuS3bECgDTtC4ynPy0fGqYcR1eQ6SwblvgWJs3VnhybfAGYe7LmRszupRyzzXn2aV-e6yQ6WqC05_K8ZIICKfO1rwR6ZXJRTG2VGZOBaNe8Qln9kg5Ieiijn09Jz929Jmm9O3eyNDV7BALbbYYQ2OkJDSvKiBbA=w1280",
  },
  {
    nom: "Midas",
    logo: "https://lh4.googleusercontent.com/XvJuuna-fAY-WIoeQpBr9u82kkWG5OzfwiOz1RkfSRxsipQMAuN9R323EJGGPQ3iSJI8VbaurG50CuAhpXz07DhsYHoHJaL0fYS6kYRY1bM3lvINwMOs2DAVXmoCSlsUbXbBUt_rRnE94yab125OCSj5iaq11V-4cGkKxCimouoi75Cng4L4JA=w1280",
  },
  {
    nom: "Fromagerie Chabert S.A.",
    logo: "https://lh3.googleusercontent.com/oM0STKXO6sa1T80HCYd5z5t5T3feRCkz0biSlf0wnlT3R_rx4XuimGDhXdHzwOuVlsJPZ-4Co96V5dP5k0fqW1VEgiL1c8JdAahbVjAzJ32CzhnnEPSHL8ToyOvxt3tF8QP5sMSF6s-Gb_PNOTWStmstQ3KtafsKRYfRxwtqbjk4dh6s0uMgmA=w1280",
  },
  {
    nom: "Belli Food",
    logo: "https://lh6.googleusercontent.com/2WLWpU80kTVP5FAHrv5oPog-7GANwoHREMIhz76AeyrzIAFGUy2R_n7ikPi5hXcHzBO3YRvNkmGuNIKudzXXv9XZEkKyFkntmR8JiroArbGl6QRhPG899vm6hNm0RgDix7a_NnV1nchcc2QERjgAipTVRWqSTZ1Fa3CBYMQES2qT1xt6re4eUQ=w1280",
  },
  {
    nom: "Ange",
    logo: "https://lh3.googleusercontent.com/a96R8-_OcMp5HC7nqKh0lp6qXvTSLEymp6FvFUuvRx2233bkf8WYAJFk_muFQFMDYnsA6OAT6O_mNez-g3q6Uwisey8yQCxf8PnNOyVQ8gmr4i8bjdbzYBB7I6l9O88UGWmdJ64lOl02UEJ61eNemKmMTi1x38JS03gE3U5dGXvCH1r5WwhvVQ=w1280",
  },
  {
    nom: "Garage Dominguez",
    logo: "https://lh6.googleusercontent.com/7G2isVsk90RQcE_kNNUorlobHwc_RkBeGK_KMg_mZf4FYnoD1P_U6W5hqmDrUHgCQLTJizZCF3tC968sbhvC055jI2JSUO-ZA551-55s-MO8oVo1O4CJLCDkk4auBcKcoQ=w1280",
  },
  {
    nom: "Boulangerie Patisserie du parc",
    logo: "https://lh5.googleusercontent.com/MDwqhe1FR0gPpJgyJ0QxnMKRo_-zp6Peztv3BTfIuAPeXvvt88ye6biZxWVUjb6GgdyytTkKRLnrimnT8ZNmLpcjKORLn940v1Zn_SHPfn-LR6vsD4Q57SgZSbAucS595w=w1280",
  },
  {
    nom: "Sushi Truck",
    logo: "https://lh4.googleusercontent.com/5ACSS5gq-4m6VtruV6xh620eWFtgHyJhNUNWp7z3w6qYAQ3Eu4Gr_GuflpmnydAwkZ6xfZQFFFrGVOkBb1bpqEXJ0cMJJ4XCZU54asxJYoBUkyCRjXnDzc00-g0pAyd4vw=w1280",
  },
  {
    nom: "Mon Contrôle Technique",
    logo: "https://lh5.googleusercontent.com/47aztFzFOI-xlXEDg3mruvrnqSrGsAaWhkas7EUL8D4-39V6ONMInvPPEI3nbw9TaVkM3G31xgOFwu3oWwmKduzj3sCSJqcc-Czn5zG43KProeFQdRB4LxUq5N2zOq5exg=w1280",
  },
  {
    nom: "La Pessière",
    logo: "https://lh5.googleusercontent.com/umh89G0PNQSNXeilYFzH82G4EZIGtaT_h3cOHzNWjAfv2TvDDxlCTXjLAp1LEJHQbi7_I4aU6I6VZO69cclInHc0yGH4gPM33xn8JsbZIX7xJ9KiOwVt5FN8tEH37QAawjoht4l8NL_ETK7MrSjyFD8aEr1uU69kXFs3E3KcGDSMcCEovrwl-Q=w1280",
  },
];

export default partenaires;
