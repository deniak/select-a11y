const select = document.getElementById('js-multi-buttons');

const Keys = {
    Backspace: 'Backspace',
    Clear: 'Clear',
    Down: 'ArrowDown',
    End: 'End',
    Enter: 'Enter',
    Escape: 'Escape',
    Home: 'Home',
    Left: 'ArrowLeft',
    PageDown: 'PageDown',
    PageUp: 'PageUp',
    Right: 'ArrowRight',
    Space: ' ',
    Tab: 'Tab',
    Up: 'ArrowUp'
}

const MenuActions = {
    Close: 0,
    CloseSelect: 1,
    First: 2,
    Last: 3,
    Next: 4,
    Open: 5,
    Previous: 6,
    Select: 7,
    Space: 8,
    Type: 9
}

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(options = [], filter, exclude = []) {
    return options.filter(option => {
        const matches = option.text.toLowerCase().indexOf(filter.toLowerCase()) === 0;
        return matches || exclude.includes(option.text);
    });
}

// return combobox action from key press
function getActionFromKey(key, menuOpen) {
    // handle opening when closed
    if (!menuOpen && key === Keys.Down) {
        return MenuActions.Open;
    }

    // handle keys when open
    if (key === Keys.Down) {
        return MenuActions.Next;
    } else if (key === Keys.Up) {
        return MenuActions.Previous;
    } else if (key === Keys.Home) {
        return MenuActions.First;
    } else if (key === Keys.End) {
        return MenuActions.Last;
    } else if (key === Keys.Escape) {
        return MenuActions.Close;
    } else if (key === Keys.Enter) {
        return MenuActions.CloseSelect;
    } else if (key === Keys.Backspace || key === Keys.Clear || key.length === 1) {
        return MenuActions.Type;
    }
}

// get updated option index
function getUpdatedIndex(current, max, action) {
    switch (action) {
        case MenuActions.First:
            return 0;
        case MenuActions.Last:
            return max;
        case MenuActions.Previous:
            return Math.max(0, current - 1);
        case MenuActions.Next:
            return Math.min(max, current + 1);
        default:
            return current;
    }
}

// check if an element is currently scrollable
function isScrollable(element) {
    return element && element.clientHeight < element.scrollHeight;
}

// ensure given child element is within the parent's visible scroll area
function maintainScrollVisibility(activeElement, scrollParent) {
    const {offsetHeight, offsetTop} = activeElement;
    const {offsetHeight: parentOffsetHeight, scrollTop} = scrollParent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = (offsetTop + offsetHeight) > (scrollTop + parentOffsetHeight);

    if (isAbove) {
        scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
        scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
}

/*
 * Multiselect Combobox w/ Buttons code
 */
const MultiselectButtons = function (el, options, multiple = true) {
    // element refs
    this.el = el;
    this.comboEl = el.querySelector('[role=combobox]');
    this.inputEl = el.querySelector('input');
    this.listboxEl = el.querySelector('[role=listbox]');

    this.idBase = this.inputEl.id;
    this.selectedEl = document.getElementById(`${this.idBase}-selected`);

    // data
    this.options = options;
    this.filteredOptions = options;

    // multiple select?
    select.multiple = multiple;

    // state
    this.activeIndex = 0;
    this.open = false;
}

MultiselectButtons.prototype.init = function () {

    this.inputEl.addEventListener('input', this.onInput.bind(this));
    this.inputEl.addEventListener('blur', this.onInputBlur.bind(this));
    this.inputEl.addEventListener('click', () => this.updateMenuState(true));
    this.inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this));
}

MultiselectButtons.prototype.filterOptions = function (value) {
    if (value) {
        this.clearOptions();
        const selectedOptions = this.el.querySelectorAll('[role=option]');
        const selectedValues = [...selectedOptions].map(option => option.innerText);
        
        this.filteredOptions = filterOptions(this.options, value, selectedValues);

        this.filteredOptions.forEach(o => {
            const alreadySelected = selectedValues.includes(o.text);
            if (!alreadySelected) {
                const optionEl = document.createElement('li');
                optionEl.setAttribute('role', 'option');
                optionEl.id = `${this.idBase}-${this.options.indexOf(o)}`;
                optionEl.className = 'combo-option';
                optionEl.setAttribute('aria-selected', 'false');
                optionEl.dataset.value = o.value;
                optionEl.innerText = o.text;
                optionEl.addEventListener('click', () => {
                    this.onOptionClick(this.options.indexOf(o));
                });
                optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));
                this.listboxEl.appendChild(optionEl);
            }
        });

        // reorder options
        // let children = [...this.listboxEl.children];
        // children.sort((a, b) => {
        //     const aIndex = this.options.findIndex(o => o.text === a.innerText);
        //     const bIndex = this.options.findIndex(o => o.text === b.innerText);
        //     return (aIndex > bIndex) ? 1 : -1;
        // });

        // for (let i = 0; i < children.length; ++i) {
        //     this.listboxEl.appendChild(children[i]);
        // }
    }

}

MultiselectButtons.prototype.onInput = function () {
    const curValue = this.inputEl.value;
    if (curValue) {
        this.filterOptions(curValue);

        // if active option is not in filtered options, set it to first filtered option
        if (this.filteredOptions.indexOf(this.options[this.activeIndex]) < 0) {
            const firstFilteredIndex = this.options.indexOf(this.filteredOptions[0]);
            this.onOptionChange(firstFilteredIndex);
        }

        const menuState = this.filteredOptions.length > 0;
        if (this.open !== menuState) {
            this.updateMenuState(menuState, false);
        }
    } else {
        this.clearOptions();
    }
}

MultiselectButtons.prototype.onInputKeyDown = function (event) {
    const {key} = event;

    const max = this.filteredOptions.length - 1;
    const activeFilteredIndex = this.filteredOptions.indexOf(this.options[this.activeIndex]);

    const action = getActionFromKey(key, this.open);

    switch (action) {
        case MenuActions.Next:
        case MenuActions.Last:
        case MenuActions.First:
        case MenuActions.Previous:
            event.preventDefault();
            const nextFilteredIndex = getUpdatedIndex(activeFilteredIndex, max, action);
            const nextRealIndex = this.options.indexOf(this.filteredOptions[nextFilteredIndex]);
            return this.onOptionChange(nextRealIndex);
        case MenuActions.CloseSelect:
            event.preventDefault();
            return this.updateOption(this.activeIndex);
        case MenuActions.Close:
            event.preventDefault();
            return this.updateMenuState(false);
        case MenuActions.Open:
            return this.updateMenuState(true);
    }
}

MultiselectButtons.prototype.onInputBlur = function () {
    if (this.ignoreBlur) {
        this.ignoreBlur = false;
        return;
    }

    if (this.open) {
        this.updateMenuState(false, false);
    }
}


MultiselectButtons.prototype.onOptionChange = function (index) {
    this.activeIndex = index;
    this.inputEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

    // update active style
    const options = this.el.querySelectorAll('[role=option]');
    const currentOptions = this.el.querySelector(`[id=${this.idBase}-${index}]`);
    [...options].forEach((optionEl) => {
        optionEl.classList.remove('option-current');
    });
    
    if (currentOptions) {
        currentOptions.classList.add('option-current');

        if (this.open && isScrollable(this.listboxEl)) {
            maintainScrollVisibility(currentOptions, this.listboxEl);
        }
    }
}

MultiselectButtons.prototype.clearOptions = function () {
    const options = this.el.querySelectorAll('[role=option]');
    [...options].forEach(optionEl => {
        if (!optionEl.classList.contains('option-selected')) {
            optionEl.remove();
        }
    });
}

MultiselectButtons.prototype.onOptionClick = function (index) {
    // this.onOptionChange(index);
    this.updateOption(index);
    this.clearOptions();
    this.updateMenuState(false);
    this.inputEl.focus();
}

MultiselectButtons.prototype.onOptionMouseDown = function () {
    this.ignoreBlur = true;
}

MultiselectButtons.prototype.removeOption = function (option) {
    const index = this.options.indexOf(option);

    // update aria-selected
    const o = this.el.querySelector(`[id=${this.idBase}-${index}]`);
    o.setAttribute('aria-selected', 'false');
    o.classList.remove('option-selected');

    // remove button
    const buttonEl = document.getElementById(`${this.idBase}-remove-${index}`);
    this.selectedEl.removeChild(buttonEl.parentElement);

    select.querySelector('option[value="' + option.value + '"]').removeAttribute('selected');
}

MultiselectButtons.prototype.selectOption = function (option) {
    if (!select.multiple) { // simple select -> remove other selected options
        this.el.querySelectorAll('.option-selected').forEach(optionEl => {
            const index = this.options.findIndex(o => o.value === optionEl.dataset.value);
            this.removeOption(this.options[index]);
        });
    }
    const index = this.options.indexOf(option);
    const selected = this.options[index];
    this.activeIndex = index;

    // update aria-selected
    const o = this.el.querySelector(`[id=${this.idBase}-${index}]`);
    o.setAttribute('aria-selected', 'true');
    o.classList.add('option-selected');

    // add remove option button
    const buttonEl = document.createElement('button');
    const listItem = document.createElement('li');
    buttonEl.className = 'remove-option';
    buttonEl.type = 'button';
    buttonEl.id = `${this.idBase}-remove-${index}`;
    buttonEl.setAttribute('aria-describedby', `${this.idBase}-remove`);
    buttonEl.addEventListener('click', () => {
        this.removeOption(option);
    });
    buttonEl.innerHTML = selected.text + ' ';

    select.querySelector('option[value="' + option.value + '"]').setAttribute('selected', 'selected');

    listItem.appendChild(buttonEl);
    this.selectedEl.appendChild(listItem);
}

MultiselectButtons.prototype.updateOption = function (index) {
    const optionEl = this.el.querySelector(`[id=${this.idBase}-${index}]`);
    const isSelected = optionEl.getAttribute('aria-selected') === 'true';

    if (isSelected) {
        this.removeOption(this.options[index]);
    } else {
        this.selectOption(this.options[index]);
    }

    this.inputEl.value = '';
    this.filterOptions('');
}

MultiselectButtons.prototype.updateMenuState = function (open, callFocus = true) {
    this.open = open;

    this.comboEl.setAttribute('aria-expanded', `${open}`);
    open ? this.el.classList.add('open') : this.el.classList.remove('open');
    callFocus && this.inputEl.focus();
}

export default MultiselectButtons;