/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Curation {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;
    let outfit;

    switch (payload) {
      case "SUMMER_COUPON":
        response = [
          Response.genText(
            i18n.__("leadgen.promo", {
              userFirstName: this.user.firstName
            })
          ),
          Response.genGenericTemplate(
            `${config.appUrl}/coupon.png`,
            i18n.__("leadgen.title"),
            i18n.__("leadgen.subtitle"),
            [Response.genPostbackButton(i18n.__("leadgen.apply"), "COUPON_50")]
          )
        ];
        break;

      case "COUPON_50":
        outfit = `${this.user.gender}-${this.randomOutfit()}`;

        response = [
          Response.genText(i18n.__("leadgen.coupon")),
          Response.genGenericTemplate(
            `${config.appUrl}/styles/${outfit}.jpg`,
            i18n.__("curation.title"),
            i18n.__("curation.subtitle"),
            [
              Response.genWebUrlButton(
                i18n.__("curation.shop"),
                `${config.shopUrl}/products/${outfit}`
              ),
              Response.genPostbackButton(
                i18n.__("curation.show"),
                "CURATION_OTHER_STYLE"
              ),
              Response.genPostbackButton(
                i18n.__("curation.sales"),
                "CARE_SALES"
              )
            ]
          )
        ];
        break;

        //**************************INTERVIEW********************
      case "CURATION":

      response = [

        Response.genImageTemplate(
            `${config.appUrl}/success.jpg`,
            i18n.__("curation.interviewintro")
          ),
        //Response.genText(i18n.__("curation.interviewintro")),

      //ask interview questions and have answer options
        Response.genQuickReply(i18n.__("curation.tellusaboutyourself"), [
          {
            title: i18n.__("curation.professionallife"),
            payload: "CURATION_PROFESSIONALLIFE"
          },
          {
            title: i18n.__("curation.personallife"),
            payload: "CURATION_PERSONALLIFE"
          }
        ])
      ];
        break;

      /*case "CURATION":
      //ask interview questions and have answer options
        response = Response.genQuickReply(i18n.__("curation.tellusaboutyourself"), [
          {
            title: i18n.__("curation.interview1a"),
            payload: "CURATION_1A"
          },
          {
            title: i18n.__("curation.interview1b"),
            payload: "CURATION_1B"
          }
        ]);
        break;*/

        /*response = Response.genQuickReply(i18n.__("curation.prompt"), [
          {
            title: i18n.__("curation.me"),
            payload: "CURATION_FOR_ME"
          },
          {
            title: i18n.__("curation.someone"),
            payload: "CURATION_SOMEONE_ELSE"
          }
        ]);
        break;*/




        //tells user that they are correct
      case "CURATION_PROFESSIONALLIFE":
      response = [
        Response.genText(i18n.__("curation.tellusaboutyourselfcorrect")),
        Response.genQuickReply(i18n.__("curation.tellusaboutyourselfseeexample"), [
          {
            title: i18n.__("curation.tellusaboutyourselfexampleyes"),
            payload: "CURATION_TELLUSYOURSELFEXAMPLEYES"
          },
          {
            title: i18n.__("curation.tellusaboutyourselfexampleno"),
            payload: "CURATION_TELLUSYOURSELFEXAMPLENO"
          }
        ])
      ];
        break;

        case "CURATION_PERSONALLIFE":
        response = [
          Response.genText(i18n.__("curation.tellusaboutyourselfwrong")),
          Response.genQuickReply(i18n.__("curation.tellusaboutyourselfseeexample"), [
            {
              title: i18n.__("curation.tellusaboutyourselfexampleyes"),
              payload: "CURATION_TELLUSYOURSELFEXAMPLEYES"
            },
            {
              title: i18n.__("curation.tellusaboutyourselfexampleno"),
              payload: "CURATION_WHYWORKHERE"
            }
          ])
        ];
          break;


          case "CURATION_TELLUSYOURSELFEXAMPLEYES":
          response = [
            Response.genText(i18n.__("curation.tellusaboutyourselfexample")),
            Response.genQuickReply(i18n.__("curation.whyworkhere"), [
              {
                title: i18n.__("curation.whyworkhereappealing"),
                payload: "CURATION_EYECONTACT"
              },
              {
                title: i18n.__("curation.whyworkherereviews"),
                payload: "CURATION_EYECONTACT"
              }
            ])
          ];
            break;

            //if they don't want an example
            case "CURATION_TELLUSYOURSELFEXAMPLENO":
            response = [
              Response.genQuickReply(i18n.__("curation.whyworkhere"), [
                {
                  title: i18n.__("curation.whyworkhereappealing"),
                  payload: "CURATION_EYECONTACT"
                },
                {
                  title: i18n.__("curation.whyworkherereviews"),
                  payload: "CURATION_EYECONTACT"
                }
              ])
            ];
              break;

            /*case "CURATION_WHYWORKHERE":
            response = [
              Response.genQuickReply(i18n.__("curation.whyworkhere"), [
                {
                  title: i18n.__("curation.whyworkhereappealing"),
                  payload: "CURATION_EYECONTACT"
                },
                {
                  title: i18n.__("curation.whyworkherereviews"),
                  payload: "CURATION_EYECONTACT"
                }
              ])
            ];
              break;*/





          case "CURATION_PERSONALLIFE":
          response = [
            Response.genText(i18n.__("curation.tellusaboutyourselfwrong")),
            Response.genQuickReply(i18n.__("curation.tellusaboutyourselfseeexample"), [
              {
                title: i18n.__("curation.tellusaboutyourselfexampleyes"),
                payload: "CURATION_TELLUSYOURSELFEXAMPLEYES"
              },
              {
                title: i18n.__("curation.tellusaboutyourselfexampleno"),
                payload: "CURATION_TELLUSYOURSELFEXAMPLENO"
              }
            ])
          ];
            break;



            //taking out the regular eyecontact for template
            case "CURATION_EYECONTACT":
            response = [
              Response.genText(i18n.__("curation.whyworkhereexample")),
              Response.genQuickReply(i18n.__("curation.eyecontact"), [
                {
                  title: i18n.__("curation.eyecontactyes"),
                  payload: "CURATION_LASTQUESTION"
                },
                {
                  title: i18n.__("curation.eyecontactno"),
                  payload: "CURATION_LASTQUESTION"
                }
              ])

            ];
              break;

              /*case "CURATION_EYECONTACT":
              response = Response.genText(i18n.__("curation.whyworkhereexample")),
              Response.genGenericTemplate(
                `${config.appUrl}/styles/${outfit}.jpg`,
                i18n.__("curation.eyecontactyesno"),
                //i18n.__("curation.subtitle"),
                [
                  Response.genWebUrlButton(
                    i18n.__("curation.shop"),
                    "CURATION_LASTQUESTION"
                  ),
                  Response.genPostbackButton(
                    i18n.__("curation.show"),
                    "CURATION_LASTQUESTION"
                  )
                ]
              );
              break;*/

              case "CURATION_LASTQUESTION":
              response = [

                Response.genImageTemplate(
                    `${config.appUrl}/eyecontact.jpg`,
                    i18n.__("curation.eyecontactwhy")
                  ),
                //Response.genText(i18n.__("curation.eyecontactwhy")),  //added in template to show image instead
                Response.genQuickReply(i18n.__("curation.finish"), [
                  {
                    title: i18n.__("curation.mainmenu"),
                    payload: "CURATION_FINISH"
                  },
                  {
                    title: i18n.__("curation.startover"),
                    payload: "CURATION"
                  }
                ])

              ];
                break;

                //**************************RESUME********************

                case "CURATION_RESUME":
                response = [

                  Response.genImageTemplate(
                      `${config.appUrl}/resume1.jpg`,
                      i18n.__("curation.resumeintro")
                    ),
                  //Response.genText(i18n.__("curation.resumeintro")),
                  Response.genQuickReply(i18n.__("curation.resumeshort"), [
                    {
                      title: i18n.__("curation.resumeshortwhy"),
                      payload: "CURATION_MEASURE"
                    },
                    {
                      title: i18n.__("curation.resumeshortnexttip"),
                      payload: "CURATION_MEASUREONLY"
                    }
                  ])

                ];
                  break;

                  case "CURATION_MEASURE":
                  response = [
                    Response.genText(i18n.__("curation.resumeshortexplanation")),
                    Response.genQuickReply(i18n.__("curation.resumemeasure"), [
                      {
                        title: i18n.__("curation.resumemeasureyes"),
                        payload: "CURATION_FONT"
                      },
                      {
                        title: i18n.__("curation.resumemeasureno"),
                        payload: "CURATION_FONT"
                      }
                    ])

                  ];
                    break;

                    //come here if the do not want to know why resume short
                    case "CURATION_MEASUREONLY":
                    response = [
                      Response.genQuickReply(i18n.__("curation.resumemeasure"), [
                        {
                          title: i18n.__("curation.resumemeasureyes"),
                          payload: "CURATION_FONT"
                        },
                        {
                          title: i18n.__("curation.resumemeasureno"),
                          payload: "CURATION_FONT"
                        }
                      ])

                    ];
                      break;




                      case "CURATION_FONT":
                      response = [
                        Response.genImageTemplate(
                            `${config.appUrl}/measure2.jpg`,
                            i18n.__("curation.resumemeasureexplanation")
                          ),

                        //Response.genText(i18n.__("curation.resumemeasureexplanation")),
                        Response.genQuickReply(i18n.__("curation.resumefont"), [
                          {
                            title: i18n.__("curation.resumefont7-9"),
                            payload: "CURATION_FONTWRONG"
                          },
                          {
                            title: i18n.__("curation.resumefont10-12"),
                            payload: "CURATION_FONTCORRECT"
                          },
                          {
                            title: i18n.__("curation.resumefont13-15"),
                            payload: "CURATION_FONTWRONG"
                          }
                        ])

                      ];
                        break;

                        case "CURATION_FONTWRONG":
                        response = [
                          Response.genText(i18n.__("curation.resumefontwrong")),
                          Response.genQuickReply(i18n.__("curation.finish"), [
                            {
                              title: i18n.__("curation.mainmenu"),
                              payload: "CURATION_FINISH"
                            },
                            {
                              title: i18n.__("curation.startover"),
                              payload: "CURATION_FINISH"
                            }
                          ])

                        ];
                          break;

                          case "CURATION_FONTCORRECT":
                          response = [
                            Response.genText(i18n.__("curation.resumefontcorrect")),
                            Response.genQuickReply(i18n.__("curation.finish"), [
                              {
                                title: i18n.__("curation.mainmenu"),
                                payload: "CURATION_FINISH"
                              },
                              {
                                title: i18n.__("curation.startover"),
                                payload: "CURATION_RESUME"
                              }
                            ])

                          ];
                            break;

                        /*case "CURATION_LASTQUESTION":
                        response = [
                          Response.genText(i18n.__("curation.eyecontactwhy")),
                          Response.genQuickReply(i18n.__("curation.finish"), [
                            {
                              title: i18n.__("curation.mainmenu"),
                              payload: "CURATION_FINISH"
                            },
                            {
                              title: i18n.__("curation.startover"),
                              payload: "CURATION_FINISH"
                            }
                          ])

                        ];
                          break;*/



                  //**************************JOB SUGGESTIONS********************
                  //1st set
                  case "CURATION_JOB_SUGGESTIONS":
                  response = [
                    Response.genImageTemplate(
                        `${config.appUrl}/jobsuggestions3.jpg`,
                        i18n.__("curation.jobblankspace")
                      ),
                      Response.genText(i18n.__("curation.jobsuggestionintro")),
                      Response.genText(i18n.__("curation.jobsuggestioninstruction")),
                    Response.genQuickReply(i18n.__("curation.jobquestion1"), [
                      {
                        title: i18n.__("curation.jobanswer1a"),
                        payload: "CURATION_1"
                      },
                      {
                        title: i18n.__("curation.jobanswer1b"),
                        payload: "CURATION_2"
                      },
                      {
                        title: i18n.__("curation.jobanswer1c"),
                        payload: "CURATION_3"
                      }
                    ])

                  ];
                    break;


                    case "CURATION_1":
                    response = [
                      Response.genQuickReply(i18n.__("curation.jobquestion2"), [
                        {
                          title: i18n.__("curation.jobanswer2a"),
                          payload: "CURATION_1_4"
                        },
                        {
                          title: i18n.__("curation.jobanswer2b"),
                          payload: "CURATION_1_5"
                        },
                        {
                          title: i18n.__("curation.jobanswer2c"),
                          payload: "CURATION_1_6"
                        }
                      ])

                    ];
                      break;

                      case "CURATION_1_4":
                      response = [
                        Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                          {
                            title: i18n.__("curation.jobanswer3a"),
                            payload: "CURATION_1_4_7"
                          },
                          {
                            title: i18n.__("curation.jobanswer3b"),
                            payload: "CURATION_1_4_8"
                          },
                          {
                            title: i18n.__("curation.jobanswer3c"),
                            payload: "CURATION_1_4_9"
                          }
                        ])

                      ];
                        break;

                        case "CURATION_1_5":
                        response = [
                          Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                            {
                              title: i18n.__("curation.jobanswer3a"),
                              payload: "CURATION_1_5_7"
                            },
                            {
                              title: i18n.__("curation.jobanswer3b"),
                              payload: "CURATION_1_5_8"
                            },
                            {
                              title: i18n.__("curation.jobanswer3c"),
                              payload: "CURATION_1_5_9"
                            }
                          ])

                        ];
                          break;

                          case "CURATION_1_6":
                          response = [
                            Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                              {
                                title: i18n.__("curation.jobanswer3a"),
                                payload: "CURATION_1_6_7"
                              },
                              {
                                title: i18n.__("curation.jobanswer3b"),
                                payload: "CURATION_1_6_8"
                              },
                              {
                                title: i18n.__("curation.jobanswer3c"),
                                payload: "CURATION_1_6_9"
                              }
                            ])

                          ];
                            break;

                      case "CURATION_2":
                      response = [
                        Response.genQuickReply(i18n.__("curation.jobquestion2"), [
                          {
                            title: i18n.__("curation.jobanswer2a"),
                            payload: "CURATION_2_4"
                          },
                          {
                            title: i18n.__("curation.jobanswer2b"),
                            payload: "CURATION_2_5"
                          },
                          {
                            title: i18n.__("curation.jobanswer2c"),
                            payload: "CURATION_2_6"
                          }
                        ])

                      ];
                        break;

                        case "CURATION_2_4":
                        response = [
                          Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                            {
                              title: i18n.__("curation.jobanswer3a"),
                              payload: "CURATION_2_4_7"
                            },
                            {
                              title: i18n.__("curation.jobanswer3b"),
                              payload: "CURATION_2_4_8"
                            },
                            {
                              title: i18n.__("curation.jobanswer3c"),
                              payload: "CURATION_2_4_9"
                            }
                          ])

                        ];
                          break;

                          case "CURATION_2_5":
                          response = [
                            Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                              {
                                title: i18n.__("curation.jobanswer3a"),
                                payload: "CURATION_2_5_7"
                              },
                              {
                                title: i18n.__("curation.jobanswer3b"),
                                payload: "CURATION_2_5_8"
                              },
                              {
                                title: i18n.__("curation.jobanswer3c"),
                                payload: "CURATION_2_5_9"
                              }
                            ])

                          ];
                            break;

                            case "CURATION_2_6":
                            response = [
                              Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                                {
                                  title: i18n.__("curation.jobanswer3a"),
                                  payload: "CURATION_2_6_7"
                                },
                                {
                                  title: i18n.__("curation.jobanswer3b"),
                                  payload: "CURATION_2_6_8"
                                },
                                {
                                  title: i18n.__("curation.jobanswer3c"),
                                  payload: "CURATION_2_6_9"
                                }
                              ])

                            ];
                              break;

                        case "CURATION_3":
                        response = [
                          Response.genQuickReply(i18n.__("curation.jobquestion2"), [
                            {
                              title: i18n.__("curation.jobanswer2a"),
                              payload: "CURATION_3_4"
                            },
                            {
                              title: i18n.__("curation.jobanswer2b"),
                              payload: "CURATION_3_5"
                            },
                            {
                              title: i18n.__("curation.jobanswer2c"),
                              payload: "CURATION_3_6"
                            }
                          ])

                        ];
                          break;

                          case "CURATION_3_4":
                          response = [
                            Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                              {
                                title: i18n.__("curation.jobanswer3a"),
                                payload: "CURATION_3_4_7"
                              },
                              {
                                title: i18n.__("curation.jobanswer3b"),
                                payload: "CURATION_3_4_8"
                              },
                              {
                                title: i18n.__("curation.jobanswer3c"),
                                payload: "CURATION_3_4_9"
                              }
                            ])

                          ];
                            break;

                            case "CURATION_3_5":
                            response = [
                              Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                                {
                                  title: i18n.__("curation.jobanswer3a"),
                                  payload: "CURATION_3_5_7"
                                },
                                {
                                  title: i18n.__("curation.jobanswer3b"),
                                  payload: "CURATION_3_5_8"
                                },
                                {
                                  title: i18n.__("curation.jobanswer3c"),
                                  payload: "CURATION_3_5_9"
                                }
                              ])

                            ];
                              break;

                              case "CURATION_3_6":
                              response = [
                                Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                                  {
                                    title: i18n.__("curation.jobanswer3a"),
                                    payload: "CURATION_3_6_7"
                                  },
                                  {
                                    title: i18n.__("curation.jobanswer3b"),
                                    payload: "CURATION_3_6_8"
                                  },
                                  {
                                    title: i18n.__("curation.jobanswer3c"),
                                    payload: "CURATION_3_6_9"
                                  }
                                ])

                              ];
                                break;








                                //result of selection
                                case "CURATION_1_4_7":
                                response = [
                                  Response.genImageTemplate(
                                      `${config.appUrl}/jobtypes.jpg`,
                                      i18n.__("curation.jobblankspace")
                                    ),
                                  Response.genText(i18n.__("curation.jobresult147")),
                                  Response.genQuickReply(i18n.__("curation.finish"), [
                                    {
                                      title: i18n.__("curation.mainmenu"),
                                      payload: "CURATION_FINISH"
                                    },
                                    {
                                      title: i18n.__("curation.startover"),
                                      payload: "CURATION_JOB_SUGGESTIONS"
                                    }
                                  ])

                                ];
                                  break;

                                  case "CURATION_1_4_8":
                                  response = [
                                    Response.genImageTemplate(
                                        `${config.appUrl}/jobtypes.jpg`,
                                        i18n.__("curation.jobblankspace")
                                      ),
                                    Response.genText(i18n.__("curation.jobresult148")),
                                    Response.genQuickReply(i18n.__("curation.finish"), [
                                      {
                                        title: i18n.__("curation.mainmenu"),
                                        payload: "CURATION_FINISH"
                                      },
                                      {
                                        title: i18n.__("curation.startover"),
                                        payload: "CURATION_JOB_SUGGESTIONS"
                                      }
                                    ])

                                  ];
                                    break;

                                    case "CURATION_1_4_9":
                                    response = [
                                      Response.genImageTemplate(
                                          `${config.appUrl}/jobtypes.jpg`,
                                          i18n.__("curation.jobblankspace")
                                        ),
                                      Response.genText(i18n.__("curation.jobresult149")),
                                      Response.genQuickReply(i18n.__("curation.finish"), [
                                        {
                                          title: i18n.__("curation.mainmenu"),
                                          payload: "CURATION_FINISH"
                                        },
                                        {
                                          title: i18n.__("curation.startover"),
                                          payload: "CURATION_JOB_SUGGESTIONS"
                                        }
                                      ])

                                    ];
                                      break;

                                      case "CURATION_1_5_7":
                                      response = [
                                        Response.genImageTemplate(
                                            `${config.appUrl}/jobtypes.jpg`,
                                            i18n.__("curation.jobblankspace")
                                          ),
                                        Response.genText(i18n.__("curation.jobresult157")),
                                        Response.genQuickReply(i18n.__("curation.finish"), [
                                          {
                                            title: i18n.__("curation.mainmenu"),
                                            payload: "CURATION_FINISH"
                                          },
                                          {
                                            title: i18n.__("curation.startover"),
                                            payload: "CURATION_JOB_SUGGESTIONS"
                                          }
                                        ])

                                      ];
                                        break;

                                        case "CURATION_1_5_8":
                                        response = [
                                          Response.genImageTemplate(
                                              `${config.appUrl}/jobtypes.jpg`,
                                              i18n.__("curation.jobblankspace")
                                            ),
                                          Response.genText(i18n.__("curation.jobresult158")),
                                          Response.genQuickReply(i18n.__("curation.finish"), [
                                            {
                                              title: i18n.__("curation.mainmenu"),
                                              payload: "CURATION_FINISH"
                                            },
                                            {
                                              title: i18n.__("curation.startover"),
                                              payload: "CURATION_JOB_SUGGESTIONS"
                                            }
                                          ])

                                        ];
                                          break;

                                          case "CURATION_1_5_9":
                                          response = [
                                            Response.genImageTemplate(
                                                `${config.appUrl}/jobtypes.jpg`,
                                                i18n.__("curation.jobblankspace")
                                              ),
                                            Response.genText(i18n.__("curation.jobresult159")),
                                            Response.genQuickReply(i18n.__("curation.finish"), [
                                              {
                                                title: i18n.__("curation.mainmenu"),
                                                payload: "CURATION_FINISH"
                                              },
                                              {
                                                title: i18n.__("curation.startover"),
                                                payload: "CURATION_JOB_SUGGESTIONS"
                                              }
                                            ])

                                          ];
                                            break;

                                            case "CURATION_1_6_7":
                                            response = [
                                              Response.genImageTemplate(
                                                  `${config.appUrl}/jobtypes.jpg`,
                                                  i18n.__("curation.jobblankspace")
                                                ),
                                              Response.genText(i18n.__("curation.jobresult167")),
                                              Response.genQuickReply(i18n.__("curation.finish"), [
                                                {
                                                  title: i18n.__("curation.mainmenu"),
                                                  payload: "CURATION_FINISH"
                                                },
                                                {
                                                  title: i18n.__("curation.startover"),
                                                  payload: "CURATION_JOB_SUGGESTIONS"
                                                }
                                              ])

                                            ];
                                              break;

                                              case "CURATION_1_6_8":
                                              response = [
                                                Response.genImageTemplate(
                                                    `${config.appUrl}/jobtypes.jpg`,
                                                    i18n.__("curation.jobblankspace")
                                                  ),
                                                Response.genText(i18n.__("curation.jobresult168")),
                                                Response.genQuickReply(i18n.__("curation.finish"), [
                                                  {
                                                    title: i18n.__("curation.mainmenu"),
                                                    payload: "CURATION_FINISH"
                                                  },
                                                  {
                                                    title: i18n.__("curation.startover"),
                                                    payload: "CURATION_JOB_SUGGESTIONS"
                                                  }
                                                ])

                                              ];
                                                break;

                                                case "CURATION_1_6_9":
                                                response = [
                                                  Response.genImageTemplate(
                                                      `${config.appUrl}/jobtypes.jpg`,
                                                      i18n.__("curation.jobblankspace")
                                                    ),
                                                  Response.genText(i18n.__("curation.jobresult169")),
                                                  Response.genQuickReply(i18n.__("curation.finish"), [
                                                    {
                                                      title: i18n.__("curation.mainmenu"),
                                                      payload: "CURATION_FINISH"
                                                    },
                                                    {
                                                      title: i18n.__("curation.startover"),
                                                      payload: "CURATION_JOB_SUGGESTIONS"
                                                    }
                                                  ])

                                                ];
                                                  break;

                                                  case "CURATION_2_4_7":
                                                  response = [
                                                    Response.genImageTemplate(
                                                        `${config.appUrl}/jobtypes.jpg`,
                                                        i18n.__("curation.jobblankspace")
                                                      ),
                                                    Response.genText(i18n.__("curation.jobresult247")),
                                                    Response.genQuickReply(i18n.__("curation.finish"), [
                                                      {
                                                        title: i18n.__("curation.mainmenu"),
                                                        payload: "CURATION_FINISH"
                                                      },
                                                      {
                                                        title: i18n.__("curation.startover"),
                                                        payload: "CURATION_JOB_SUGGESTIONS"
                                                      }
                                                    ])

                                                  ];
                                                    break;

                                                    case "CURATION_2_4_8":
                                                    response = [
                                                      Response.genImageTemplate(
                                                          `${config.appUrl}/jobtypes.jpg`,
                                                          i18n.__("curation.jobblankspace")
                                                        ),
                                                      Response.genText(i18n.__("curation.jobresult248")),
                                                      Response.genQuickReply(i18n.__("curation.finish"), [
                                                        {
                                                          title: i18n.__("curation.mainmenu"),
                                                          payload: "CURATION_FINISH"
                                                        },
                                                        {
                                                          title: i18n.__("curation.startover"),
                                                          payload: "CURATION_JOB_SUGGESTIONS"
                                                        }
                                                      ])

                                                    ];
                                                      break;

                                                      case "CURATION_2_4_9":
                                                      response = [
                                                        Response.genImageTemplate(
                                                            `${config.appUrl}/jobtypes.jpg`,
                                                            i18n.__("curation.jobblankspace")
                                                          ),
                                                        Response.genText(i18n.__("curation.jobresult249")),
                                                        Response.genQuickReply(i18n.__("curation.finish"), [
                                                          {
                                                            title: i18n.__("curation.mainmenu"),
                                                            payload: "CURATION_FINISH"
                                                          },
                                                          {
                                                            title: i18n.__("curation.startover"),
                                                            payload: "CURATION_JOB_SUGGESTIONS"
                                                          }
                                                        ])

                                                      ];
                                                        break;

                                                        case "CURATION_2_5_7":
                                                        response = [
                                                          Response.genImageTemplate(
                                                              `${config.appUrl}/jobtypes.jpg`,
                                                              i18n.__("curation.jobblankspace")
                                                            ),
                                                          Response.genText(i18n.__("curation.jobresult257")),
                                                          Response.genQuickReply(i18n.__("curation.finish"), [
                                                            {
                                                              title: i18n.__("curation.mainmenu"),
                                                              payload: "CURATION_FINISH"
                                                            },
                                                            {
                                                              title: i18n.__("curation.startover"),
                                                              payload: "CURATION_JOB_SUGGESTIONS"
                                                            }
                                                          ])

                                                        ];
                                                          break;

                                                          case "CURATION_2_5_8":
                                                          response = [
                                                            Response.genImageTemplate(
                                                                `${config.appUrl}/jobtypes.jpg`,
                                                                i18n.__("curation.jobblankspace")
                                                              ),
                                                            Response.genText(i18n.__("curation.jobresult258")),
                                                            Response.genQuickReply(i18n.__("curation.finish"), [
                                                              {
                                                                title: i18n.__("curation.mainmenu"),
                                                                payload: "CURATION_FINISH"
                                                              },
                                                              {
                                                                title: i18n.__("curation.startover"),
                                                                payload: "CURATION_JOB_SUGGESTIONS"
                                                              }
                                                            ])

                                                          ];
                                                            break;

                                                            case "CURATION_2_5_9":
                                                            response = [
                                                              Response.genImageTemplate(
                                                                  `${config.appUrl}/jobtypes.jpg`,
                                                                  i18n.__("curation.jobblankspace")
                                                                ),
                                                              Response.genText(i18n.__("curation.jobresult259")),
                                                              Response.genQuickReply(i18n.__("curation.finish"), [
                                                                {
                                                                  title: i18n.__("curation.mainmenu"),
                                                                  payload: "CURATION_FINISH"
                                                                },
                                                                {
                                                                  title: i18n.__("curation.startover"),
                                                                  payload: "CURATION_JOB_SUGGESTIONS"
                                                                }
                                                              ])

                                                            ];
                                                              break;

                                                              case "CURATION_2_6_7":
                                                              response = [
                                                                Response.genImageTemplate(
                                                                    `${config.appUrl}/jobtypes.jpg`,
                                                                    i18n.__("curation.jobblankspace")
                                                                  ),
                                                                Response.genText(i18n.__("curation.jobresult267")),
                                                                Response.genQuickReply(i18n.__("curation.finish"), [
                                                                  {
                                                                    title: i18n.__("curation.mainmenu"),
                                                                    payload: "CURATION_FINISH"
                                                                  },
                                                                  {
                                                                    title: i18n.__("curation.startover"),
                                                                    payload: "CURATION_JOB_SUGGESTIONS"
                                                                  }
                                                                ])

                                                              ];
                                                                break;

                                                                case "CURATION_2_6_8":
                                                                response = [
                                                                  Response.genImageTemplate(
                                                                      `${config.appUrl}/jobtypes.jpg`,
                                                                      i18n.__("curation.jobblankspace")
                                                                    ),
                                                                  Response.genText(i18n.__("curation.jobresult268")),
                                                                  Response.genQuickReply(i18n.__("curation.finish"), [
                                                                    {
                                                                      title: i18n.__("curation.mainmenu"),
                                                                      payload: "CURATION_FINISH"
                                                                    },
                                                                    {
                                                                      title: i18n.__("curation.startover"),
                                                                      payload: "CURATION_JOB_SUGGESTIONS"
                                                                    }
                                                                  ])

                                                                ];
                                                                  break;

                                                                  case "CURATION_2_6_9":
                                                                  response = [
                                                                    Response.genImageTemplate(
                                                                        `${config.appUrl}/jobtypes.jpg`,
                                                                        i18n.__("curation.jobblankspace")
                                                                      ),
                                                                    Response.genText(i18n.__("curation.jobresult269")),
                                                                    Response.genQuickReply(i18n.__("curation.finish"), [
                                                                      {
                                                                        title: i18n.__("curation.mainmenu"),
                                                                        payload: "CURATION_FINISH"
                                                                      },
                                                                      {
                                                                        title: i18n.__("curation.startover"),
                                                                        payload: "CURATION_JOB_SUGGESTIONS"
                                                                      }
                                                                    ])

                                                                  ];
                                                                    break;

                                                                    case "CURATION_3_4_7":
                                                                    response = [
                                                                      Response.genImageTemplate(
                                                                          `${config.appUrl}/jobtypes.jpg`,
                                                                          i18n.__("curation.jobblankspace")
                                                                        ),
                                                                      Response.genText(i18n.__("curation.jobresult347")),
                                                                      Response.genQuickReply(i18n.__("curation.finish"), [
                                                                        {
                                                                          title: i18n.__("curation.mainmenu"),
                                                                          payload: "CURATION_FINISH"
                                                                        },
                                                                        {
                                                                          title: i18n.__("curation.startover"),
                                                                          payload: "CURATION_JOB_SUGGESTIONS"
                                                                        }
                                                                      ])

                                                                    ];
                                                                      break;

                                                                      case "CURATION_3_4_8":
                                                                      response = [
                                                                        Response.genImageTemplate(
                                                                            `${config.appUrl}/jobtypes.jpg`,
                                                                            i18n.__("curation.jobblankspace")
                                                                          ),
                                                                        Response.genText(i18n.__("curation.jobresult348")),
                                                                        Response.genQuickReply(i18n.__("curation.finish"), [
                                                                          {
                                                                            title: i18n.__("curation.mainmenu"),
                                                                            payload: "CURATION_FINISH"
                                                                          },
                                                                          {
                                                                            title: i18n.__("curation.startover"),
                                                                            payload: "CURATION_JOB_SUGGESTIONS"
                                                                          }
                                                                        ])

                                                                      ];
                                                                        break;

                                                                        case "CURATION_3_4_9":
                                                                        response = [
                                                                          Response.genImageTemplate(
                                                                              `${config.appUrl}/jobtypes.jpg`,
                                                                              i18n.__("curation.jobblankspace")
                                                                            ),
                                                                          Response.genText(i18n.__("curation.jobresult349")),
                                                                          Response.genQuickReply(i18n.__("curation.finish"), [
                                                                            {
                                                                              title: i18n.__("curation.mainmenu"),
                                                                              payload: "CURATION_FINISH"
                                                                            },
                                                                            {
                                                                              title: i18n.__("curation.startover"),
                                                                              payload: "CURATION_JOB_SUGGESTIONS"
                                                                            }
                                                                          ])

                                                                        ];
                                                                          break;

                                                                          case "CURATION_3_5_7":
                                                                          response = [
                                                                            Response.genImageTemplate(
                                                                                `${config.appUrl}/jobtypes.jpg`,
                                                                                i18n.__("curation.jobblankspace")
                                                                              ),
                                                                            Response.genText(i18n.__("curation.jobresult357")),
                                                                            Response.genQuickReply(i18n.__("curation.finish"), [
                                                                              {
                                                                                title: i18n.__("curation.mainmenu"),
                                                                                payload: "CURATION_FINISH"
                                                                              },
                                                                              {
                                                                                title: i18n.__("curation.startover"),
                                                                                payload: "CURATION_JOB_SUGGESTIONS"
                                                                              }
                                                                            ])

                                                                          ];
                                                                            break;

                                                                            case "CURATION_3_5_8":
                                                                            response = [
                                                                              Response.genImageTemplate(
                                                                                  `${config.appUrl}/jobtypes.jpg`,
                                                                                  i18n.__("curation.jobblankspace")
                                                                                ),
                                                                              Response.genText(i18n.__("curation.jobresult358")),
                                                                              Response.genQuickReply(i18n.__("curation.finish"), [
                                                                                {
                                                                                  title: i18n.__("curation.mainmenu"),
                                                                                  payload: "CURATION_FINISH"
                                                                                },
                                                                                {
                                                                                  title: i18n.__("curation.startover"),
                                                                                  payload: "CURATION_JOB_SUGGESTIONS"
                                                                                }
                                                                              ])

                                                                            ];
                                                                              break;

                                                                              case "CURATION_3_5_9":
                                                                              response = [
                                                                                Response.genImageTemplate(
                                                                                    `${config.appUrl}/jobtypes.jpg`,
                                                                                    i18n.__("curation.jobblankspace")
                                                                                  ),
                                                                                Response.genText(i18n.__("curation.jobresult359")),
                                                                                Response.genQuickReply(i18n.__("curation.finish"), [
                                                                                  {
                                                                                    title: i18n.__("curation.mainmenu"),
                                                                                    payload: "CURATION_FINISH"
                                                                                  },
                                                                                  {
                                                                                    title: i18n.__("curation.startover"),
                                                                                    payload: "CURATION_JOB_SUGGESTIONS"
                                                                                  }
                                                                                ])

                                                                              ];
                                                                                break;

                                                                                case "CURATION_3_6_7":
                                                                                response = [
                                                                                  Response.genImageTemplate(
                                                                                      `${config.appUrl}/jobtypes.jpg`,
                                                                                      i18n.__("curation.jobblankspace")
                                                                                    ),
                                                                                  Response.genText(i18n.__("curation.jobresult367")),
                                                                                  Response.genQuickReply(i18n.__("curation.finish"), [
                                                                                    {
                                                                                      title: i18n.__("curation.mainmenu"),
                                                                                      payload: "CURATION_FINISH"
                                                                                    },
                                                                                    {
                                                                                      title: i18n.__("curation.startover"),
                                                                                      payload: "CURATION_JOB_SUGGESTIONS"
                                                                                    }
                                                                                  ])

                                                                                ];
                                                                                  break;

                                                                                  case "CURATION_3_6_8":
                                                                                  response = [
                                                                                    Response.genImageTemplate(
                                                                                        `${config.appUrl}/jobtypes.jpg`,
                                                                                        i18n.__("curation.jobblankspace")
                                                                                      ),
                                                                                    Response.genText(i18n.__("curation.jobresult368")),
                                                                                    Response.genQuickReply(i18n.__("curation.finish"), [
                                                                                      {
                                                                                        title: i18n.__("curation.mainmenu"),
                                                                                        payload: "CURATION_FINISH"
                                                                                      },
                                                                                      {
                                                                                        title: i18n.__("curation.startover"),
                                                                                        payload: "CURATION_JOB_SUGGESTIONS"
                                                                                      }
                                                                                    ])

                                                                                  ];
                                                                                    break;

                                                                                    case "CURATION_3_6_9":
                                                                                    response = [
                                                                                      Response.genImageTemplate(
                                                                                          `${config.appUrl}/jobtypes.jpg`,
                                                                                          i18n.__("curation.jobblankspace")
                                                                                        ),
                                                                                      Response.genText(i18n.__("curation.jobresult369")),
                                                                                      Response.genQuickReply(i18n.__("curation.finish"), [
                                                                                        {
                                                                                          title: i18n.__("curation.mainmenu"),
                                                                                          payload: "CURATION_FINISH"
                                                                                        },
                                                                                        {
                                                                                          title: i18n.__("curation.startover"),
                                                                                          payload: "CURATION_JOB_SUGGESTIONS"
                                                                                        }
                                                                                      ])

                                                                                    ];
                                                                                      break;


                      //3rd set
                      /*case "CURATION_JOBQUESTION3":
                      response = [
                        Response.genQuickReply(i18n.__("curation.jobquestion3"), [
                          {
                            title: i18n.__("curation.jobanswer3a"),
                            payload: "CURATION_RESULT"
                          },
                          {
                            title: i18n.__("curation.jobanswer3b"),
                            payload: "CURATION_RESULT"
                          },
                          {
                            title: i18n.__("curation.jobanswer3c"),
                            payload: "CURATION_RESULT"
                          }
                        ])

                      ];
                        break;*/








                    //***********FINISH SCENARIOS************

                case "CURATION_FINISH":
                response = [
                  //Response.genText(i18n.__("get_started.guidance")),
                  Response.genQuickReply(i18n.__("get_started.help"), [
                    {
                      title: i18n.__("menu.suggestion"),
                      payload: "CURATION" //interview
                    },
                    {
                      title: i18n.__("menu.help"),
                      payload: "CURATION_RESUME"
                    },
                    {
                      title: i18n.__("menu.job"),
                      payload: "CURATION_JOB_SUGGESTIONS"
                    }
                  ])

                ];
                  break;




      /*case "CURATION_PERSONALLIFE":
        response = Response.genQuickReply(i18n.__("curation.occasion"), [
          {
            title: i18n.__("curation.work"),
            payload: "CURATION_OCASION_WORK"
          },
          {
            title: i18n.__("curation.dinner"),
            payload: "CURATION_OCASION_DINNER"
          },
          {
            title: i18n.__("curation.party"),
            payload: "CURATION_OCASION_PARTY"
          },
          {
            title: i18n.__("curation.sales"),
            payload: "CARE_SALES"
          }
        ]);
        break;*/

      case "CURATION_OCASION_WORK":
        // Store the user budget preference here
        response = Response.genQuickReply(i18n.__("curation.price"), [
          {
            title: "~ $20",
            payload: "CURATION_BUDGET_20_WORK"
          },
          {
            title: "~ $30",
            payload: "CURATION_BUDGET_30_WORK"
          },
          {
            title: "+ $50",
            payload: "CURATION_BUDGET_50_WORK"
          }
        ]);
        break;

      case "CURATION_OCASION_DINNER":
        // Store the user budget preference here
        response = Response.genQuickReply(i18n.__("curation.price"), [
          {
            title: "~ $20",
            payload: "CURATION_BUDGET_20_DINNER"
          },
          {
            title: "~ $30",
            payload: "CURATION_BUDGET_30_DINNER"
          },
          {
            title: "+ $50",
            payload: "CURATION_BUDGET_50_DINNER"
          }
        ]);
        break;

      case "CURATION_OCASION_PARTY":
        // Store the user budget preference here
        response = Response.genQuickReply(i18n.__("curation.price"), [
          {
            title: "~ $20",
            payload: "CURATION_BUDGET_20_PARTY"
          },
          {
            title: "~ $30",
            payload: "CURATION_BUDGET_30_PARTY"
          },
          {
            title: "+ $50",
            payload: "CURATION_BUDGET_50_PARTY"
          }
        ]);
        break;

      case "CURATION_BUDGET_20_WORK":
      case "CURATION_BUDGET_30_WORK":
      case "CURATION_BUDGET_50_WORK":
      case "CURATION_BUDGET_20_DINNER":
      case "CURATION_BUDGET_30_DINNER":
      case "CURATION_BUDGET_50_DINNER":
      case "CURATION_BUDGET_20_PARTY":
      case "CURATION_BUDGET_30_PARTY":
      case "CURATION_BUDGET_50_PARTY":
        response = this.genCurationResponse(payload);
        break;

      case "CURATION_OTHER_STYLE":
        // Build the recommendation logic here
        outfit = `${this.user.gender}-${this.randomOutfit()}`;

        response = Response.genGenericTemplate(
          `${config.appUrl}/styles/${outfit}.jpg`,
          i18n.__("curation.title"),
          i18n.__("curation.subtitle"),
          [
            Response.genWebUrlButton(
              i18n.__("curation.shop"),
              `${config.shopUrl}/products/${outfit}`
            ),
            Response.genPostbackButton(
              i18n.__("curation.show"),
              "CURATION_OTHER_STYLE"
            )
          ]
        );
        break;
    }

    return response;
  }

  genCurationResponse(payload) {
    let occasion = payload.split("_")[3].toLowerCase();
    let budget = payload.split("_")[2].toLowerCase();
    let outfit = `${this.user.gender}-${occasion}`;

    let buttons = [
      Response.genWebUrlButton(
        i18n.__("curation.shop"),
        `${config.shopUrl}/products/${outfit}`
      ),
      Response.genPostbackButton(
        i18n.__("curation.show"),
        "CURATION_OTHER_STYLE"
      )
    ];

    if (budget === "50") {
      buttons.push(
        Response.genPostbackButton(i18n.__("curation.sales"), "CARE_SALES")
      );
    }

    let response = Response.genGenericTemplate(
      `${config.appUrl}/styles/${outfit}.jpg`,
      i18n.__("curation.title"),
      i18n.__("curation.subtitle"),
      buttons
    );

    return response;
  }

  randomOutfit() {
    let occasion = ["work", "party", "dinner"];
    let randomIndex = Math.floor(Math.random() * occasion.length);

    return occasion[randomIndex];
  }
};
