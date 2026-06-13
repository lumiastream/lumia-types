---
sidebar_position: 1
title: Create counter
---

You can set up a manual counter so that you can trigger multiple things based on the counter value

e.g. the code below will trigger a command named **'money-12'** when the **counter = 12**

```js
async function() {

    // Variables come back as strings, so wrap with Number(). Defaults to 0 the first time the variable doesn't exist yet
    let redeemCount = Number(await getVariable('redeemCount')) || 0;

    redeemCount++;

    // setVariable creates the variable if it doesn't exist, or updates it
    await setVariable({ name: 'redeemCount', value: redeemCount });

    if (redeemCount === 12) {
            // call the command named money-12
            callCommand({ name: 'money-12' });
            // show a popup message in the Lumia stream app with '{{username}} is the 12th redeemer' inside
            showToast({ message: '{{username}} is the 12th redeemer' });
    }

    // always make sure this is the last line in the code otherwise your computer may get slower due to memory leaks
    done();
}
```

:::tip

**code blocks** like the one above 👆 have a copy button on the **top right corner** click it then paste in Lumia stream

:::
