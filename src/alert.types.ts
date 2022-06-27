import { LumiaAlertValues } from "./activity.types";

export enum LumiaVariationConditions {
  RANDOM = "RANDOM", // Frequency: Percent Chance
  GREATER_NUMBER = "GREATER_NUMBER",
  LESS_NUMBER = "LESS_NUMBER",
  EQUAL_STRING = "EQUAL_STRING",
  EQUAL_NUMBER = "EQUAL_NUMBER",
  EQUAL_SELECTION = "EQUAL_SELECTION",
  EQUAL_CURRENCY_NUMBER = "EQUAL_CURRENCY_NUMBER",
  GREATER_CURRENCY_NUMBER = "GREATER_CURRENCY_NUMBER",

  // Twitch Sub Variations
  SUBSCRIBED_MONTHS_EQUAL = "SUBSCRIBED_MONTHS_EQUAL",
  SUBSCRIBED_MONTHS_GREATER = "SUBSCRIBED_MONTHS_GREATER",
  IS_GIFT = "IS_GIFT",
  GIFT_SUB_EQUAL = "GIFT_SUB_EQUAL",
  GIFT_SUB_GREATER = "GIFT_SUB_GREATER",
  IS_PRIME = "IS_PRIME",

  // Twitch Goal
  TARGET_ACHIEVED = "TARGET_ACHIEVED",

  IS_ON = "IS_ON",
}

export enum LumiaVariationCurrency {
  NONE = "",
  USD = "USD",
  EUR = "EUR",
  CAD = "CAD",
  AUD = "AUD",
  DKK = "DKK",
  CZK = "CZK",
  HKD = "HKD",
  ILS = "ILS",
  MYR = "MYR",
  MXN = "MXN",
  NOK = "NOK",
  NZD = "NZD",
  PHP = "PHP",
  PLN = "PLN",
  GBP = "GBP",
  RUB = "RUB",
  SGD = "SGD",
  SEK = "SEK",
  CHF = "CHF",
  THB = "THB",
  TRY = "TRY",
}

export const VariationCurrencySymbol = {
  [LumiaVariationCurrency.NONE]: "",
  [LumiaVariationCurrency.USD]: "$",
  [LumiaVariationCurrency.EUR]: "€",
  [LumiaVariationCurrency.CAD]: "$",
  [LumiaVariationCurrency.AUD]: "$",
  [LumiaVariationCurrency.DKK]: "kr",
  [LumiaVariationCurrency.CZK]: "Kč",
  [LumiaVariationCurrency.HKD]: "$",
  [LumiaVariationCurrency.ILS]: "₪",
  [LumiaVariationCurrency.MYR]: "RM",
  [LumiaVariationCurrency.MXN]: "$",
  [LumiaVariationCurrency.NOK]: "kr",
  [LumiaVariationCurrency.NZD]: "$",
  [LumiaVariationCurrency.PHP]: "₱",
  [LumiaVariationCurrency.PLN]: "zł",
  [LumiaVariationCurrency.GBP]: "£",
  [LumiaVariationCurrency.RUB]: "₽",
  [LumiaVariationCurrency.SGD]: "$",
  [LumiaVariationCurrency.SEK]: "kr",
  [LumiaVariationCurrency.CHF]: "CHF",
  [LumiaVariationCurrency.THB]: "฿",
  [LumiaVariationCurrency.TRY]: "TRY",
};

export const LumiaAlertConfigs: Record<
  LumiaAlertValues | string,
  {
    message: string;
    acceptedVariables: string[];
    LumiavariationConditions: Array<{
      type: LumiaVariationConditions;
      selections?: Array<{
        label: string;
        message?: string;
        value: string | number;
      }>;
    }>;
  }
> = {
  // twitch: {
  [LumiaAlertValues.TWITCH_STREAM_LIVE]: {
    message: "Twitch Stream is now live",
    acceptedVariables: ["eventTime"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TWITCH_STREAM_OFFLINE]: {
    message: "Twitch Stream is offline",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TWITCH_FOLLOWER]: {
    message: "{{username}} is now following!",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TWITCH_SUBSCRIBER]: {
    message: "{{username}} just subscribed!",
    acceptedVariables: [
      "username",
      "tier",
      "giftAmount",
      "totalGifts",
      "subMonths",
      "message",
      "subPlan",
      "subPlanName",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_SELECTION,
        selections: [
          { label: "Tier 1", value: 1000 },
          { label: "Tier 2", value: 2000 },
          { label: "Tier 3", value: 3000 },
          { label: "Prime", value: "Prime" },
        ],
      },
      {
        type: LumiaVariationConditions.SUBSCRIBED_MONTHS_EQUAL,
      },
      {
        type: LumiaVariationConditions.SUBSCRIBED_MONTHS_GREATER,
      },
      {
        type: LumiaVariationConditions.IS_PRIME,
      },
      {
        type: LumiaVariationConditions.IS_GIFT,
      },
      {
        type: LumiaVariationConditions.GIFT_SUB_EQUAL,
      },
      {
        type: LumiaVariationConditions.GIFT_SUB_GREATER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_BITS]: {
    message: "{{username}} cheered {{amount}} bits",
    acceptedVariables: ["username", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_HOST]: {
    message: "{{username}} hosted with {{viewers}} viewers",
    acceptedVariables: ["username", "viewers"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_RAID]: {
    message: "{{username}} raided with {{viewers}} viewers",
    acceptedVariables: ["username", "viewers"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_HYPETRAIN_STARTED]: {
    message: "Hype train started",
    acceptedVariables: ["total", "progress", "goal"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_HYPETRAIN_PROGRESSED]: {
    message: "Hype train progressed to {{progress}}",
    acceptedVariables: ["level", "total", "progress", "goal"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: {
    message: "Hype train progressed to level {{level}}",
    acceptedVariables: ["level", "total", "progress", "goal"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_HYPETRAIN_LEVEL_PROGRESSED]: {
    message: "Hype train progressed to level {{level}}",
    acceptedVariables: ["level", "total", "progress", "goal"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_HYPETRAIN_ENDED]: {
    message:
      "Hype train ended on level {{level}} and reached a total of {{total}}",
    acceptedVariables: ["level", "total"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_POLL_STARTED]: {
    message: "New poll started {{poll_title}} with choices {{poll_choices}}",
    acceptedVariables: [
      "poll_title",
      "poll_id",
      "poll_choices",
      "poll_started_at",
      "poll_ends_at",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_POLL_PROGRESSED]: {
    message:
      "Poll {{poll_title}} updated and the current leader is {{poll_winning_title}}",
    acceptedVariables: [
      "poll_title",
      "poll_id",
      "poll_choices",
      "poll_winning_title",
      "poll_winning_id",
      "poll_winning_votes",
      "poll_started_at",
      "poll_ends_at",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_POLL_ENDED]: {
    message:
      "Poll {{poll_title}} ended! The winning choice is: {{poll_winning_title}} with a total of {{poll_winning_votes}} votes",
    acceptedVariables: [
      "poll_title",
      "poll_id",
      "poll_choices",
      "poll_winning_title",
      "poll_winning_id",
      "poll_winning_votes",
      "poll_started_at",
      "poll_ends_at",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.TWITCH_PREDICTION_STARTED]: {
    message:
      "Prediction started with the title {{prediction_title}}! Choices are {{prediction_outcome1_title}} or {{prediction_outcome2_title}}",
    acceptedVariables: [
      "prediction_title",
      "prediction_id",
      "prediction_outcomes",
      "prediction_outcome1_title",
      "prediction_outcome1_points",
      "prediction_outcome1_color",
      "prediction_outcome2_title",
      "prediction_outcome2_points",
      "prediction_outcome2_color",
      "prediction_started_at",
      "prediction_ends_at",
    ],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TWITCH_PREDICTION_STARTED]: {
    message:
      "Prediction {{prediction_title}} progressed. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points",
    acceptedVariables: [
      "prediction_title",
      "prediction_id",
      "prediction_outcomes",
      "prediction_winning_outcome_title",
      "prediction_winning_outcome_points",
      "prediction_winning_outcome_color",
      "prediction_outcome1_title",
      "prediction_outcome1_points",
      "prediction_outcome1_color",
      "prediction_outcome2_title",
      "prediction_outcome2_points",
      "prediction_outcome2_color",
      "prediction_started_at",
      "prediction_ends_at",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_STRING },
    ],
  },
  [LumiaAlertValues.TWITCH_PREDICTION_LOCKED]: {
    message:
      "Prediction {{prediction_title}} locked. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points",
    acceptedVariables: [
      "prediction_title",
      "prediction_id",
      "prediction_outcomes",
      "prediction_winning_outcome_title",
      "prediction_winning_outcome_points",
      "prediction_winning_outcome_color",
      "prediction_outcome1_title",
      "prediction_outcome1_points",
      "prediction_outcome1_color",
      "prediction_outcome2_title",
      "prediction_outcome2_points",
      "prediction_outcome2_color",
      "prediction_started_at",
      "prediction_ends_at",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_STRING },
    ],
  },
  [LumiaAlertValues.TWITCH_PREDICTION_ENDED]: {
    message:
      "Prediction {{prediction_title}} ended. The current leader is {{prediction_winning_outcome_title}} with {{prediction_winning_outcome_points}} points",
    acceptedVariables: [
      "prediction_title",
      "prediction_id",
      "prediction_outcomes",
      "prediction_winning_outcome_title",
      "prediction_winning_outcome_points",
      "prediction_winning_outcome_color",
      "prediction_outcome1_title",
      "prediction_outcome1_points",
      "prediction_outcome1_color",
      "prediction_outcome2_title",
      "prediction_outcome2_points",
      "prediction_outcome2_color",
      "prediction_started_at",
      "prediction_ends_at",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_STRING },
    ],
  },
  [LumiaAlertValues.TWITCH_GOAL_STARTED]: {
    message:
      "Goal {{goal_description}} started with a target of {{goal_target_amount}}",
    acceptedVariables: [
      "goal_type",
      "goal_id",
      "goal_description",
      "goal_aomunt",
      "goal_target_amount",
    ],

    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TWITCH_GOAL_PROGRESSED]: {
    message:
      "Goal {{goal_description}} progressed to {{goal_aomunt}} with a target of {{goal_target_amount}}",
    acceptedVariables: [
      "goal_type",
      "goal_id",
      "goal_description",
      "goal_aomunt",
      "goal_target_amount",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_NUMBER },
      { type: LumiaVariationConditions.GREATER_NUMBER },
    ],
  },
  [LumiaAlertValues.TWITCH_GOAL_ENDED]: {
    message:
      "Goal {{goal_description}} ended at amount {{goal_aomunt}} with a target of {{goal_target_amount}}",
    acceptedVariables: [
      "goal_type",
      "goal_id",
      "goal_description",
      "goal_aomunt",
      "goal_target_amount",
      "goal_achieved",
      "target_achieved",
      "goal_status",
    ],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.TARGET_ACHIEVED },
      { type: LumiaVariationConditions.EQUAL_NUMBER },
      { type: LumiaVariationConditions.GREATER_NUMBER },
    ],
  },
  [LumiaAlertValues.TWITCH_CATEGORY]: {
    message: "Category changed to {{category_name}}",
    acceptedVariables: ["category_name", "category_id", "channel_title"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_STRING },
    ],
  },
  [LumiaAlertValues.TWITCH_CLIP]: {
    message: "Clip taken by {{username}} with title of {{clip_title}}",
    acceptedVariables: [
      "clip_url",
      "clip_id",
      "clip_title",
      "clip_duration",
      "clip_user_is_mod",
      "clip_user_is_vip",
      "clip_user_is_sub",
      "clip_user_is_follower",
    ],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  // },
  // youtube: {
  [LumiaAlertValues.YOUTUBE_SUBSCRIBER]: {
    message: "{{username}} just subscribed!",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.YOUTUBE_MEMBER]: {
    message: "{{username}} became a member!",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.YOUTUBE_SUPERCHAT]: {
    message:
      "{{username}} just super chatted with {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER },
      { type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER },
    ],
  },
  [LumiaAlertValues.YOUTUBE_SUPERCHAT]: {
    message:
      "{{username}} just super chatted with {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER },
      { type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER },
    ],
  },
  [LumiaAlertValues.YOUTUBE_SUPERSTICKER]: {
    message: "{{username}} just sent a supersticker with {{amount}}",
    acceptedVariables: ["username", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_NUMBER },
      { type: LumiaVariationConditions.GREATER_NUMBER },
    ],
  },
  // },
  // facebook: {
  [LumiaAlertValues.FACEBOOK_FOLLOWER]: {
    message: "{{username}} just followed",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.FACEBOOK_REACTION]: {
    message: "{{username}} reacted with a {{reaction}}",
    acceptedVariables: ["username", "reaction"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_STRING },
    ],
  },
  [LumiaAlertValues.FACEBOOK_STAR]: {
    message: "{{username}} sent {{amount}} stars",
    acceptedVariables: ["username", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_NUMBER },
      { type: LumiaVariationConditions.GREATER_NUMBER },
    ],
  },
  [LumiaAlertValues.FACEBOOK_SUPPORT]: {
    message: "{{username}} just supported",
    acceptedVariables: ["username", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      { type: LumiaVariationConditions.EQUAL_NUMBER },
      { type: LumiaVariationConditions.GREATER_NUMBER },
    ],
  },
  [LumiaAlertValues.FACEBOOK_SHARE]: {
    message: "{{username}} just shared your page",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.FACEBOOK_FAN]: {
    message: "{{username}} became a fan",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  // },
  // glimesh: {
  [LumiaAlertValues.GLIMESH_FOLLOWER]: {
    message: "{{username}} just followed",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.GLIMESH_SUBSCRIBER]: {
    message: "{{username}} just subscribed",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  // },
  // trovo: {
  [LumiaAlertValues.TROVO_FOLLOWER]: {
    message: "{{username}} just followed",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TROVO_SUBSCRIBER]: {
    message: "{{username}} just subscribed",
    acceptedVariables: ["username"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.IS_GIFT,
      },
    ],
  },
  // },
  // tiktok: {
  [LumiaAlertValues.TIKTOK_FOLLOWER]: {
    message: "{{username}} just followed",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TIKTOK_LIKE]: {
    message: "{{username}} sent a like",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.TIKTOK_GIFT]: {
    message: "{{username}} sent a {{amount}} {{type}}'s",
    acceptedVariables: ["username", "type", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TIKTOK_SHARE]: {
    message: "{{username}} shared your stream",
    acceptedVariables: ["username"],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  // },
  // streamlabs: {
  [LumiaAlertValues.STREAMLABS_DONATION]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.STREAMLABS_CHARITY]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.STREAMLABS_MERCH]: {
    message: "{{username}} just bought {{merch}}. They said {{message}}",
    acceptedVariables: ["username", "merch", "message"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.STREAMLABS_REDEMPTION]: {
    message: "{{username}} just redeemed {{redemption}}. They said {{message}}",
    acceptedVariables: ["username", "redemption", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.STREAMLABS_PRIMEGIFT]: {
    message: "{{username}} sent a prime gift",
    acceptedVariables: ["username"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  // },
  // streamelements: {
  [LumiaAlertValues.STREAMELEMENTS_DONATION]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.STREAMELEMENTS_MERCH]: {
    message: "{{username}} just bought {{merch}}. They said {{message}}",
    acceptedVariables: ["username", "merch", "message"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.STREAMELEMENTS_REDEMPTION]: {
    message: "{{username}} just redeemed {{redemption}}. They said {{message}}",
    acceptedVariables: ["username", "redemption", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  // },
  // extralife: {
  [LumiaAlertValues.EXTRALIFE_DONATION]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // donordrive: {
  [LumiaAlertValues.DONORDRIVE_DONATION]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // tiltify: {
  [LumiaAlertValues.TILTIFY_DONATION]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount", "message"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // patreon: {
  [LumiaAlertValues.PATREON_PLEDGE]: {
    message: "{{username}} just pledged {{amount}}",
    acceptedVariables: ["username", "currency", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // woocommerce: {
  [LumiaAlertValues.WOOCOMMERCE_ORDER]: {
    message: "Someone just ordered {{item}} in the amount of {{amount}}",
    acceptedVariables: ["item", "amount"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // kofi: {
  [LumiaAlertValues.KOFI_DONATION]: {
    message: "{{username}} just donated {{amount}}. They said {{message}}",
    acceptedVariables: ["username", "currency", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.KOFI_SUBSCRIPTION]: {
    message: "{{username}} just subscribed with tier {{tier}}",
    acceptedVariables: ["username", "currency", "amount", "tier"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.KOFI_COMMISSION]: {
    message: "{{username}} just commisioned with amount {{amount}}",
    acceptedVariables: ["username", "currency", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.KOFI_SHOPORDER]: {
    message: "{{username}} just created a shop order with amount {{amount}}",
    acceptedVariables: ["username", "currency", "amount"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // twitter: {
  [LumiaAlertValues.TWITTER_FOLLOWER]: {
    message:
      "Received a new Twitter follower. Follower count is now {{followers}}",
    acceptedVariables: ["followers"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITTER_LIKE]: {
    message: "Reached a total likes of {{likes}} on Twitter",
    acceptedVariables: ["likes"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  [LumiaAlertValues.TWITTER_LIKE]: {
    message: "Reached {{retweets}}",
    acceptedVariables: ["retweets"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  // },
  // spotify: {
  [LumiaAlertValues.SPOTIFY_SWITCH_SONG]: {
    message: "Song switched to {{name}}",
    acceptedVariables: ["name", "uri", "image"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.SPOTIFY_SONG_PLAYED]: {
    message: "Song {{name}} is now playing",
    acceptedVariables: ["name", "uri", "image"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.SPOTIFY_SONG_PLAYED]: {
    message: "Song {{name}} paused",
    acceptedVariables: ["name", "uri", "image"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  // },
  // vlc: {
  [LumiaAlertValues.VLC_SWITCH_SONG]: {
    message: "Song switched to {{name}}",
    acceptedVariables: ["name", "uri", "image"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.VLC_SONG_PLAYED]: {
    message: "Song {{name}} is now playing",
    acceptedVariables: ["name", "uri", "image"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.VLC_SONG_PLAYED]: {
    message: "Song {{name}} paused",
    acceptedVariables: ["name", "uri", "image"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  // },
  // treatstream: {
  [LumiaAlertValues.TREATSTREAM_TREAT]: {
    message: "{{username}} sent {{treat}}",
    acceptedVariables: ["username", "treat"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  // },
  // tipeeestream: {
  [LumiaAlertValues.TIPEEESTREAM_DONATION]: {
    message: "{{username}} just donated {{amount}}",
    acceptedVariables: ["username", "currency", "amount"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_CURRENCY_NUMBER,
      },
      {
        type: LumiaVariationConditions.GREATER_CURRENCY_NUMBER,
      },
    ],
  },
  // },
  // obs: {
  [LumiaAlertValues.OBS_SWITCH_SCENE]: {
    message: "OBS scene switched to {{scene}}",
    acceptedVariables: ["scene"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.OBS_SCENE_ITEM_VISIBILITY]: {
    message: "OBS scene item {{item}} visibility turned on",
    acceptedVariables: ["item"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.OBS_SWITCH_PROFILE]: {
    message: "OBS profile switched to {{profile}}",
    acceptedVariables: ["profile"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  [LumiaAlertValues.OBS_SWITCH_TRANSITION]: {
    message: "OBS transition switched",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.OBS_TRANSITION_BEGIN]: {
    message: "OBS transition started",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.OBS_TRANSITION_END]: {
    message: "OBS transition ended",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.OBS_STREAM_STARTING]: {
    message: "OBS stream started",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.OBS_STREAM_STOPPING]: {
    message: "OBS stream stopped",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  // },
  // slobs: {
  [LumiaAlertValues.SLOBS_SWITCH_SCENE]: {
    message: "SLOBS scene switched to {{scene}}",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.SLOBS_SWITCH_SCENE_COLLECTION]: {
    message: "SLOBS scene collection switched",
    acceptedVariables: [],
    LumiavariationConditions: [{ type: LumiaVariationConditions.RANDOM }],
  },
  [LumiaAlertValues.SLOBS_SCENE_ITEM_VISIBILITY]: {
    message: "SLOBS scene item {{item}} visibility turned on",
    acceptedVariables: ["item"],
    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.EQUAL_STRING,
      },
    ],
  },
  // },
  // pulse: {
  [LumiaAlertValues.PULSE_HEARTRATE]: {
    message: "Heart rate changed to {{heartrate}}",
    acceptedVariables: ["heartrate", "min_heartrate", "max_heartrate"],

    LumiavariationConditions: [
      { type: LumiaVariationConditions.RANDOM },
      {
        type: LumiaVariationConditions.GREATER_NUMBER,
      },
    ],
  },
  // },
};
